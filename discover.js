/*
 * Discover — the only page this host renders itself.
 *
 * It lists what is published and then gets out of the way: every card is a
 * plain link to a directory, so the site it opens gets the whole viewport with
 * none of this page's chrome carried into it.
 *
 * The listing starts from sites-data.js so the grid paints immediately, then
 * reconciles against the live repo tree so a site published since the last
 * edit of that file still appears without anyone touching this page.
 */
(function () {
    'use strict';

    var THEME_KEY = 'harithkavish-theme';
    var data = window.SITES_DATA || { sites: [] };

    /* Owners the end-to-end suite creates. Real work never lands under these. */
    var TEST_OWNER = /^@(e2e|test)/i;

    var grid = document.querySelector('[data-grid]');
    var countEl = document.querySelector('[data-count]');
    var searchEl = document.querySelector('[data-search]');
    var ownersEl = document.querySelector('[data-owners]');
    var testToggle = document.querySelector('[data-test-toggle]');
    var emptyEl = document.querySelector('[data-empty]');

    var state = {
        query: '',
        owner: 'all',
        showTests: false
    };

    /* ---- theme ---------------------------------------------------------- */

    (function theme() {
        var button = document.querySelector('[data-theme-toggle]');

        function apply(next, persist) {
            document.documentElement.dataset.theme = next;
            if (persist) {
                localStorage.setItem(THEME_KEY, next);
            }
            button.textContent = next === 'dark' ? 'Light mode' : 'Dark mode';
            button.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        }

        apply(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light', false);

        button.addEventListener('click', function () {
            apply(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true);
        });

        document.querySelector('[data-year]').textContent = new Date().getFullYear();
    })();

    /* ---- model ---------------------------------------------------------- */

    /*
     * Both directory conventions put the owner in a segment beginning with '@';
     * only its position differs. Anything without one is not a published site.
     */
    function parse(path) {
        var parts = path.split('/').filter(Boolean);
        if (!parts.length) {
            return null;
        }

        if (parts[0].charAt(0) === '@') {
            return { owner: parts[0], slug: parts.slice(1).join('/') };
        }

        if (parts.length > 1 && parts[1].charAt(0) === '@') {
            return { owner: parts[1], slug: parts[0] };
        }

        return null;
    }

    function titleFrom(slug, owner) {
        // An owner-root site has no slug of its own to name it.
        var source = slug || owner.replace(/^@/, '');
        return source
            .split(/[/\-_]+/)
            .filter(Boolean)
            .map(function (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(' ');
    }

    function build(path, listed) {
        var parsed = parse(path);

        // Published before the @owner convention existed, so the manifest names its owner.
        if (!parsed && listed && listed.owner) {
            parsed = { owner: listed.owner, slug: path };
        }

        if (!parsed) {
            return null;
        }

        return {
            path: path,
            href: '/' + path + '/',
            owner: parsed.owner,
            slug: parsed.slug,
            name: (listed && listed.name) || titleFrom(parsed.slug, parsed.owner),
            summary: (listed && listed.summary) || '',
            isTest: listed && typeof listed.test === 'boolean' ? listed.test : TEST_OWNER.test(parsed.owner)
        };
    }

    var sites = [];
    var byPath = {};

    function add(path, listed) {
        var normalised = path.replace(/^\/+|\/+$/g, '');
        if (byPath[normalised]) {
            return;
        }
        var site = build(normalised, listed);
        if (site) {
            byPath[normalised] = site;
            sites.push(site);
        }
    }

    data.sites.forEach(function (listed) {
        add(listed.path, listed);
    });

    /* ---- rendering ------------------------------------------------------ */

    function matches(site) {
        if (site.isTest && !state.showTests) {
            return false;
        }
        if (state.owner !== 'all' && site.owner !== state.owner) {
            return false;
        }
        if (!state.query) {
            return true;
        }
        return (site.name + ' ' + site.owner + ' ' + site.path + ' ' + site.summary)
            .toLowerCase()
            .indexOf(state.query) !== -1;
    }

    function card(site) {
        var link = document.createElement('a');
        link.className = 'card site-card';
        link.href = site.href;

        var topline = document.createElement('div');
        topline.className = 'card__topline';

        var owner = document.createElement('span');
        owner.className = 'pill pill--neutral';
        owner.textContent = site.owner;
        topline.appendChild(owner);

        if (site.isTest) {
            var flag = document.createElement('span');
            flag.className = 'card__route';
            flag.textContent = 'test';
            topline.appendChild(flag);
        }

        var title = document.createElement('h3');
        title.className = 'card__title';
        title.textContent = site.name;

        link.appendChild(topline);
        link.appendChild(title);

        if (site.summary) {
            var body = document.createElement('p');
            body.className = 'card__body';
            body.textContent = site.summary;
            link.appendChild(body);
        }

        var path = document.createElement('span');
        path.className = 'site-card__path';
        path.textContent = site.href;
        link.appendChild(path);

        return link;
    }

    function render() {
        var visible = sites.filter(matches).sort(function (first, second) {
            return first.name.localeCompare(second.name, undefined, { sensitivity: 'base', numeric: true });
        });

        grid.textContent = '';
        visible.forEach(function (site) {
            grid.appendChild(card(site));
        });

        countEl.textContent = visible.length + (visible.length === 1 ? ' site' : ' sites');
        emptyEl.hidden = visible.length > 0;
        grid.hidden = visible.length === 0;
    }

    function renderOwners() {
        var seen = {};
        var owners = [];

        sites.forEach(function (site) {
            if ((site.isTest && !state.showTests) || seen[site.owner]) {
                return;
            }
            seen[site.owner] = true;
            owners.push(site.owner);
        });

        owners.sort(function (first, second) {
            return first.localeCompare(second, undefined, { sensitivity: 'base' });
        });

        // A filter set to an owner that is no longer on show would hide everything.
        if (state.owner !== 'all' && owners.indexOf(state.owner) === -1) {
            state.owner = 'all';
        }

        ownersEl.textContent = '';
        ['all'].concat(owners).forEach(function (owner) {
            var chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'chip' + (owner === state.owner ? ' is-active' : '');
            chip.textContent = owner === 'all' ? 'Everyone' : owner;
            chip.setAttribute('aria-pressed', String(owner === state.owner));
            chip.addEventListener('click', function () {
                state.owner = owner;
                renderOwners();
                render();
            });
            ownersEl.appendChild(chip);
        });
    }

    function refresh() {
        renderOwners();
        render();
    }

    /* ---- controls ------------------------------------------------------- */

    searchEl.addEventListener('input', function () {
        state.query = searchEl.value.trim().toLowerCase();
        render();
    });

    testToggle.addEventListener('change', function () {
        state.showTests = testToggle.checked;
        refresh();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === '/' && document.activeElement !== searchEl) {
            event.preventDefault();
            searchEl.focus();
        }
    });

    refresh();

    /* ---- live index ----------------------------------------------------- */

    /*
     * Sites are published by both people and agents, so the directory listing
     * moves faster than sites-data.js does. Read the tree and fold in anything
     * that is served but unlisted. A failure here is silent by design: the page
     * has already rendered everything the manifest knew about.
     */
    if (data.repo && window.fetch) {
        fetch('https://api.github.com/repos/' + data.repo + '/git/trees/' + (data.branch || 'main') + '?recursive=1', {
            headers: { Accept: 'application/vnd.github+json' }
        })
            .then(function (response) {
                return response.ok ? response.json() : Promise.reject(new Error(String(response.status)));
            })
            .then(function (payload) {
                var before = sites.length;

                (payload.tree || []).forEach(function (node) {
                    if (node.type !== 'blob' || !/(^|\/)index\.html$/i.test(node.path)) {
                        return;
                    }
                    var dir = node.path.replace(/(^|\/)index\.html$/i, '');
                    if (dir) {
                        add(dir, null);
                    }
                });

                if (sites.length !== before) {
                    refresh();
                }
            })
            .catch(function () {
                /* Offline, rate limited, or the repo is private — the manifest stands. */
            });
    }
})();
