/**
 * Page-specific Javascript file.  Should generally be included as a separate asset bundle in your page template.
 * example: {{ assets.js('js/pages/sign-in-or-register') | raw }}
 *
 * This script depends on uf-table.js, moment.js, handlebars-helpers.js
 *
 * Target page: /users/u/{username}
 */

$(document).ready(function() {
    // Control buttons
    bindUserButtons($("#view-user"));

    // Table of activities
    $("#widget-user-activities").ufTable({
        dataUrl: site.uri.public + '/api/users/u/' + page.username + '/activities',
        useLoadingTransition: site.uf_table.use_loading_transition
    });

    // Table of permissions
    $("#widget-permissions").ufTable({
        dataUrl: site.uri.public + '/api/users/u/' + page.username + '/permissions',
        useLoadingTransition: site.uf_table.use_loading_transition
    });
});
