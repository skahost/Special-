<!-- Import scripts. -->
@if(Auth::check())
  <script src="/extensions/nebula/libraries/fetchStyle.js?{timestamp}"></script>
  <script src="/extensions/nebula/libraries/currentPage.js?{timestamp}"></script>
  <script src="/extensions/nebula/libraries/fetchServerId.js?{timestamp}"></script>
  <script src="/extensions/nebula/libraries/statusOrb.js?{timestamp}"></script>
  <script src="/extensions/nebula/libraries/customContextMenu.js?{timestamp}"></script>
  <script src="/extensions/nebula/libraries/copyapi.js?{timestamp}"></script>
  <script src="/extensions/nebula/libraries/assignElementIds.js?{timestamp}"></script>
  <script src="/extensions/nebula/libraries/fileMode.js?{timestamp}"></script>
  <script src="/extensions/nebula/libraries/insertAboveApp.js?{timestamp}"></script>
  <script src="/extensions/nebula/libraries/sidebarMiddleClick.js?{timestamp}"></script>
  <script src="/extensions/nebula/libraries/viewportVisibility.js?{timestamp}"></script>
  <script src="/extensions/nebula/libraries/floatingWindows.js?{timestamp}"></script>
  @if($n_keyboard_shortcuts == "1")<script src="/extensions/nebula/libraries/keybinds.js?{timestamp}"></script>@endif
  @if($n_keyboard_shortcuts == "1")<script src="/extensions/nebula/libraries/keybindsModal.js?{timestamp}"></script>@endif
  @if($n_alert == "1")<script src="/extensions/nebula/libraries/assets/marked.min.js?{timestamp}"></script>@endif
  <script src="/extensions/nebula/libraries/assets/popper.min.js?{timestamp}"></script>
  <script src="/extensions/nebula/libraries/assets/tippy-bundle.umd.min.js?{timestamp}"></script>
  <!-- SK Host custom additions: shared client config -->
  <?php
    $__nebula_sleeping = json_decode($n_idle_sleeping ?? '', true);
    if(!is_array($__nebula_sleeping)) { $__nebula_sleeping = []; }
    $__nebula_players = json_decode($n_player_counts ?? '', true);
    if(!is_array($__nebula_players)) { $__nebula_players = []; }
  ?>
  <script>
    window.NebulaConfig = {
      idleShutdown: {
        enabled: @json($n_enable_idle_shutdown == "1"),
        timeoutMinutes: {{ (int) ($n_idle_timeout_minutes ?: 10) }},
        sleeping: @json(array_keys($__nebula_sleeping)),
      },
      players: {
        enabled: @json($n_enable_player_count == "1"),
        counts: @json((object) $__nebula_players),
      },
      ui: {
        removeFooter: @json($n_remove_footer == "1"),
        sidebarExtensionsList: @json($n_sidebar_extensions_list == "1"),
        consoleKillButton: @json($n_console_kill_button == "1"),
        serverCardBackground: @json($n_server_card_bg_image ?? ""),
      },
      modules: {
        plugin_installer: @json($n_enable_plugin_installer == "1"),
        player_manager: @json($n_enable_player_manager == "1"),
        mod_installer: @json($n_enable_mod_installer == "1"),
        version_changer: @json($n_enable_version_changer == "1"),
        bedrock_addon_installer: @json($n_enable_bedrock_addon_installer == "1"),
        subdomain_manager: @json($n_enable_subdomain_manager == "1"),
        bedrock_version_changer: @json($n_enable_bedrock_version_changer == "1"),
        server_splitters: @json($n_enable_server_splitters == "1"),
        properties_manager: @json($n_enable_properties_manager == "1"),
        world_manager: @json($n_enable_world_manager == "1"),
        world_installer: @json($n_enable_world_installer == "1"),
        auto_suspension: @json($n_enable_auto_suspension == "1"),
      },
    };
  </script>
  <script src="/extensions/nebula/libraries/idleShutdown.js?{timestamp}"></script>
  <script src="/extensions/nebula/libraries/nebulaModules.js?{timestamp}"></script>
@endif
<script src="/extensions/nebula/libraries/errorHandler.js?{timestamp}"></script>
<script src="/extensions/nebula/libraries/locationchange.js?{timestamp}"></script>
<?php
  // SK Host: third-party analytics phone-home removed.
?>

<!-- Import stylesheets. -->
<style>
  @import url("/extensions/nebula/libraries/statusOrb.css?{timestamp}");
  @import url("/extensions/nebula/libraries/fixUserInterfaceBugs.css?{timestamp}");
  @import url("/extensions/nebula/libraries/customContextMenu.css?{timestamp}");
  @import url("/extensions/nebula/libraries/fileMode.css?{timestamp}");
  @import url("/extensions/nebula/libraries/borderRadius.css?{timestamp}");
  @import url("/extensions/nebula/libraries/extendedStyles.css?{timestamp}");
  @import url("/extensions/nebula/libraries/tagStyling.css?{timestamp}");
  @import url("/extensions/nebula/libraries/floatingWindows.css?{timestamp}");
  @import url("/extensions/nebula/libraries/patterns.css?{timestamp}");
  @import url("/extensions/nebula/libraries/animations.css?{timestamp}");
  @import url("/extensions/nebula/libraries/idleShutdown.css?{timestamp}");
  @import url("/extensions/nebula/libraries/nebulaModules.css?{timestamp}");
  @if($n_server_card_bg_image != "")
    @import url("/extensions/nebula/libraries/serverCardBackground.css?{timestamp}");
  @endif

  @if($n_server_list == "cards")
    @import url("/extensions/nebula/libraries/serversCards.css?{timestamp}");
  @else
    @import url("/extensions/nebula/libraries/serversList.css?{timestamp}");
  @endif

  @if($n_keyboard_shortcuts == "1")
    @import url("/extensions/nebula/libraries/keybindsModal.css?{timestamp}");
  @endif

  @if($n_server_overview_graphs == "0")
    @import url("/extensions/nebula/libraries/hideServerOverviewGraphs.css?{timestamp}");
  @endif

  @if($n_dashboard_transparency != "0")
    @import url("/extensions/nebula/libraries/transparentUI.css?{timestamp}");
    @import url("/extensions/nebula/libraries/extendedStylesTransparency.css?{timestamp}");
  @endif

  @if($n_sidebar_hover_tooltip == "1")
    @import url("/extensions/nebula/libraries/sidebarTooltip.css?{timestamp}");
  @endif

  @if($n_website_links == "1")
    @import url("/extensions/nebula/libraries/weblinks.css?{timestamp}");
  @endif

  @if($n_alert == "1")
    @import url("/extensions/nebula/libraries/alert.css?{timestamp}");
  @endif

  @if($n_watermark_auth != "0")
    @import url("/extensions/nebula/libraries/authWatermark.css?{timestamp}");
  @endif

  @if($blueprint->dbGet("settings", "recaptcha:enabled") == "true")
    @import url("/extensions/nebula/libraries/recaptcha.css?{timestamp}");
  @endif

  @if(!Auth::check())
    @import url("/extensions/nebula/libraries/hideRecaptcha.css?{timestamp}");
    @import url("/extensions/nebula/libraries/extendedStylesAuth.css?{timestamp}");
  @endif

  <?php
    /* Icon theme imports
    *
    * SK Host fetches icon-theme webfonts from a CDN. These are third-party
    * icon packs (Bootstrap Icons, Lucide, etc.) served as static font assets.
    */
  ?>
  @import url("https://cdn.nebula.style/icons/bootstrap/bootstrap-icons.css");
  @if($n_icon_fallback == "feather")                 @import url("https://cdn.nebula.style/icons/feather/feather-icons.css"); @endif
  @if($n_icon_fallback == "lucide")                  @import url("https://cdn.nebula.style/icons/lucide/lucide.css"); @endif
  @if($n_icon_fallback == "material")                @import url("https://cdn.nebula.style/icons/materialdesign/default/materialdesignicons.css"); @endif
  @if($n_icon_fallback == "material-light")          @import url("https://cdn.nebula.style/icons/materialdesign/light/materialdesignicons-light.css"); @endif
  @if($n_icon_fallback == "fontawesome")             @import url("https://cdn.nebula.style/icons/fontawesome/fontawesome.css"); @endif
  @if($n_icon_fallback == "eva-outline")             @import url("https://cdn.nebula.style/icons/eva/evaicons.css"); @endif
  @if($n_icon_fallback == "eva-solid")               @import url("https://cdn.nebula.style/icons/eva/evaicons.css"); @endif
  @if($n_icon_fallback == "remix-outline")           @import url("https://cdn.nebula.style/icons/remix/remixicon.css"); @endif
  @if($n_icon_fallback == "remix-solid")             @import url("https://cdn.nebula.style/icons/remix/remixicon.css"); @endif
  @if($n_icon_fallback == "tabler")                  @import url("https://cdn.nebula.style/icons/tabler/tabler.css"); @endif
  @if($n_icon_fallback == "octicons")                @import url("https://cdn.nebula.style/icons/octicons/octicons.css"); @endif
  @if($n_icon_fallback == "akar-icons")              @import url("https://cdn.nebula.style/icons/akar-icons/akar-icons.css"); @endif
  @if($n_icon_fallback == "hugeicons-solid")         @import url("https://private.nebula.style/icons/hugeicons/hugeicons-font.css"); @endif
  @if($n_icon_fallback == "hugeicons-stroke")        @import url("https://private.nebula.style/icons/hugeicons/hugeicons-font.css"); @endif
</style>
