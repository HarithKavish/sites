/*
 * The sites published on this host.
 *
 * Every site lives in its own directory and is served full screen at its own
 * address — nothing here wraps or frames them. This file only describes them
 * so the discover page can list them before (and if) the live index loads.
 *
 * Two directory conventions are in use, and both are read the same way:
 *   @owner/site-name/index.html   — current
 *   site-name/@owner/index.html   — earlier sites, still served
 *
 * A path with no @owner segment at all predates both; give it an explicit
 * `owner` here and it lists like any other.
 *
 * To add a site: publish the directory, then add a row below. A site that is
 * published but not listed still shows up — the discover page reads the repo
 * tree at load — it just falls back to its directory name for a title.
 */
window.SITES_DATA = {
    repo: 'HarithKavish/sites',
    branch: 'main',
    sites: [
        {
            path: '@harithkavish/introvert-blog',
            name: 'Quiet Thoughts',
            summary: "An introvert's blog on solitude, deep work, books, and the gentle art of listening."
        },
        {
            path: 'automation/@harithkavish',
            name: 'Automation Hub',
            summary: 'A guide to rule-based automation, AI-driven workflows, and robotic process automation.'
        },
        {
            path: 'banks/@harithkavish',
            name: 'Understanding Banks',
            summary: 'What financial institutions are, the forms they take, and the services they run on.'
        },
        {
            path: 'drinking-water/@harithkavish',
            name: 'Pure Hydration',
            summary: 'The science of drinking water and what adequate hydration does for the body.'
        },
        {
            path: 'india/@harithkavish',
            name: 'India',
            summary: 'A journey through the history, culture, and natural wonders of a land of contrasts.'
        },
        {
            path: 'megha_malar_dance_academy',
            owner: '@harithkavish',
            name: 'Megha Malar Dance Academy',
            summary: 'A Bharatanatyam academy — the guru, the classes, the stage, and the gallery.'
        },
        {
            path: 'alex-morgan-portfolio/@keviningersal',
            name: 'Alex Morgan',
            summary: 'Portfolio of a digital designer and creative director — brands, interfaces, experiences.'
        },
        {
            path: 'request/@keviningersal',
            name: 'Deploy & Host',
            summary: 'Planning a deployment for performance, security, and accessibility, static or dynamic.'
        },
        {
            path: 'delete-request-sites-github-pages/@keviningersal',
            name: 'Pages Removal Guide',
            summary: 'How to take a site down from GitHub Pages and tidy up the configuration behind it.'
        },

        /* Fixtures from the end-to-end suite. Kept, but folded away by default. */
        {
            /* An owner name the @e2e / @test rule can't spot, so it says so outright. */
            path: '@human-1777450486677/human-1777450486677/auth-deploy-test',
            name: 'Auth Deploy Test',
            summary: 'Fixture from the authenticated deploy check.',
            test: true
        },
        {
            path: '@e2e-1777456271559-6ba8ea/e2e-1777456271559-6ba8ea/e2e-hosted-test',
            name: 'Hosted Deploy Test',
            summary: 'Fixture from the hosted deploy check.'
        },
        {
            path: '@e2e-1777456389109-5addf9/e2e-1777456389109-5addf9/e2e-hosted-test',
            name: 'Hosted Deploy Test',
            summary: 'Fixture from the hosted deploy check.'
        },
        {
            path: 'spec-site-b/@testuser04',
            name: 'Spec Site B',
            summary: 'Minimal fixture page from the publishing spec.'
        },
        {
            path: '@e2e1774013303660/composting-blog',
            name: 'Composting Basics',
            summary: "A beginner's guide to composting."
        },
        {
            path: '@e2e1774026393454/grass',
            name: 'All About Grass',
            summary: 'Lawn and turf reference page.'
        },
        {
            path: '@e2e1774026758007',
            name: 'Grass Tips Blog',
            summary: 'Expert lawn care advice.'
        },
        {
            path: '@e2e1774026758007/grass',
            name: 'Grass',
            summary: 'Grow your digital garden.'
        },
        {
            path: '@e2e1774026758007/grass-site',
            name: 'All About Grass',
            summary: 'Lawn and turf reference page.'
        },
        {
            path: '@e2e1774027069772/grass-site',
            name: 'All About Grass',
            summary: 'Lawn and turf reference page.'
        },
        {
            path: '@e2e1774027521444/grass-tips-blog',
            name: 'Grass Tips',
            summary: 'Lawn care and gardening advice.'
        },
        {
            path: '@e2e1774028182130/grass-site',
            name: 'All About Grass',
            summary: 'Lawn and turf reference page.'
        },
        {
            path: '@e2e1774028182130/grass-tips',
            name: 'Grass Tips',
            summary: 'A greener lawn guide.'
        },
        {
            path: '@e2e1774028942074/grass',
            name: 'All About Grass',
            summary: 'Lawn and turf reference page.'
        },
        {
            path: '@e2e1774028942074/grass-tips-blog',
            name: 'Grass Tips Blog',
            summary: 'Lawn care notes.'
        }
    ]
};
