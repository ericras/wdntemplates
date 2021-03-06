<?php
function wdnInclude($path)
{
    if (function_exists('virtual')) {
        return virtual($path);
    }

    $documentRoot = __DIR__;
    if (!empty($_SERVER['DOCUMENT_ROOT'])) {
        $documentRoot = $_SERVER['DOCUMENT_ROOT'];
    }

    return readfile($documentRoot . $path);
}
?>
<!DOCTYPE html>
<html class="no-js" lang="en">
<head>
    <?php wdnInclude("/wdn/templates_5.0/includes/global/head-1.html"); ?>
  <!--
    Membership and regular participation in the UNL Web Developer Network is required to use the UNLedu Web Framework. Visit the WDN site at http://wdn.unl.edu/. Register for our mailing list and add your site or server to UNLwebaudit.
    All framework code is the property of the UNL Web Developer Network. The code seen in a source code view is not, and may not be used as, a template. You may not use this code, a reverse-engineered version of this code, or its associated visual presentation in whole or in part to create a derivative work.
    This message may not be removed from any pages based on the UNLedu Web Framework.

    $Id$
  -->
  <!-- TemplateBeginEditable name="doctitle" -->
  <title>Use a descriptive page title | Optional Site Title (use for context) | University of Nebraska&ndash;Lincoln</title>
  <!-- TemplateEndEditable -->
    <?php wdnInclude("/wdn/templates_5.0/includes/global/head-2-local.html"); ?>
  <!-- TemplateBeginEditable name="head" -->
  <!-- Place optional header elements here -->
  <!-- TemplateEndEditable -->
  <!-- TemplateParam name="class" type="text" value="" -->
</head>
<body class="@@(_document['class'])@@ unl" data-version="$HTML_VERSION$">
<?php wdnInclude("/wdn/templates_5.0/includes/global/skip-nav.html"); ?>
<header class="dcf-header" id="dcf-header" role="banner">
    <?php wdnInclude("/wdn/templates_5.0/includes/global/header-global-1.html"); ?>
    <?php wdnInclude("/wdn/templates_5.0/includes/global/nav-global-1.html"); ?>
        <?php wdnInclude("/wdn/templates_5.0/includes/global/visit-global-1.html"); ?>
        <!-- TemplateBeginEditable name="visitlocal" -->
        <?php wdnInclude("/wdn/templates_5.0/includes/local/visit-local.html"); ?>
        <!-- TemplateEndEditable -->
        <?php wdnInclude("/wdn/templates_5.0/includes/global/visit-global-2.html"); ?>
        <?php wdnInclude("/wdn/templates_5.0/includes/global/apply-global-1.html"); ?>
        <!-- TemplateBeginEditable name="applylocal" -->
        <?php wdnInclude("/wdn/templates_5.0/includes/local/apply-local.html"); ?>
        <!-- TemplateEndEditable -->
        <?php wdnInclude("/wdn/templates_5.0/includes/global/apply-global-2.html"); ?>
        <?php wdnInclude("/wdn/templates_5.0/includes/global/give-global-1.html"); ?>
        <!-- TemplateBeginEditable name="givelocal" -->
        <?php wdnInclude("/wdn/templates_5.0/includes/local/give-local.html"); ?>
        <!-- TemplateEndEditable -->
        <?php wdnInclude("/wdn/templates_5.0/includes/global/give-global-2.html"); ?>
    <?php wdnInclude("/wdn/templates_5.0/includes/global/nav-global-2.html"); ?>
    <?php wdnInclude("/wdn/templates_5.0/includes/global/idm.html"); ?>
    <?php wdnInclude("/wdn/templates_5.0/includes/global/search.html"); ?>
    <?php wdnInclude("/wdn/templates_5.0/includes/global/header-global-2.html"); ?>
    <?php wdnInclude("/wdn/templates_5.0/includes/global/logo-lockup-1.html"); ?>
    <?php wdnInclude("/wdn/templates_5.0/includes/global/site-affiliation-1.html"); ?>
  <!-- TemplateBeginEditable name="affiliation" -->
  <a href="#">My site affiliation</a>
  <!-- TemplateEndEditable -->
    <?php wdnInclude("/wdn/templates_5.0/includes/global/site-affiliation-2.html"); ?>
    <?php wdnInclude("/wdn/templates_5.0/includes/global/site-title-1.html"); ?>
  <!-- TemplateBeginEditable name="titlegraphic" -->
  <a class="unl-site-title-medium" href="#">Title of my site</a>
  <!-- TemplateEndEditable -->
    <?php wdnInclude("/wdn/templates_5.0/includes/global/site-title-2.html"); ?>
    <?php wdnInclude("/wdn/templates_5.0/includes/global/logo-lockup-2.html"); ?>
    <?php wdnInclude("/wdn/templates_5.0/includes/global/nav-toggle-group.html"); ?>
    <?php wdnInclude("/wdn/templates_5.0/includes/global/nav-menu-1.html"); ?>
    <?php wdnInclude("/wdn/templates_5.0/includes/global/nav-toggle-btn.html"); ?>
    <?php wdnInclude("/wdn/templates_5.0/includes/global/nav-menu-child-1.html"); ?>
  <!-- TemplateBeginEditable name="navlinks" -->
    <?php wdnInclude("/wdn/templates_5.0/includes/local/nav-local.html"); ?>
  <!-- TemplateEndEditable -->
    <?php wdnInclude("/wdn/templates_5.0/includes/global/nav-menu-child-2.html"); ?>
    <?php wdnInclude("/wdn/templates_5.0/includes/global/nav-menu-2.html"); ?>
</header>

<main class="dcf-main" id="dcf-main" role="main" tabindex="-1">

  <!-- TemplateBeginEditable name="hero" -->
  <div class="dcf-hero dcf-hero-default">
    <!-- TemplateEndEditable -->
    <div class="dcf-hero-group-1">
      <div class="dcf-breadcrumbs-wrapper">
        <nav class="dcf-breadcrumbs" id="dcf-breadcrumbs" role="navigation" aria-label="breadcrumbs">
          <!-- TemplateBeginEditable name="breadcrumbs" -->
          <ol>
            <li><a href="https://www.unl.edu/">Nebraska</a></li>
            <li><a href="/">Site Title</a></li>
            <li><span aria-current="page">Home</span></li>
          </ol>
          <!-- TemplateEndEditable -->
        </nav>
      </div>
      <header class="dcf-page-title" id="dcf-page-title">
        <!-- TemplateBeginEditable name="pagetitle" -->
        <h1>Please Title Your Page Here</h1>
        <!-- TemplateEndEditable -->
      </header>
      <!-- TemplateBeginEditable name="herogroup1" -->
      <!-- TemplateEndEditable -->
    </div>
    <!-- TemplateBeginEditable name="herogroup2" -->
    <div class="dcf-hero-group-2">
    </div>
    <!-- TemplateEndEditable -->
  </div>
  <div class="dcf-main-content dcf-wrapper">
    <!-- TemplateBeginEditable name="maincontentarea" -->
    <p>Impress your audience with awesome content!</p>
    <!-- TemplateEndEditable -->
  </div>
</main>
<footer class="dcf-footer" id="dcf-footer" role="contentinfo">
  <!-- TemplateBeginEditable name="optionalfooter" -->
  <!-- TemplateEndEditable -->
    <?php wdnInclude("/wdn/templates_5.0/includes/global/footer-global-1.html"); ?>
  <!-- TemplateBeginEditable name="contactinfo" -->
    <?php wdnInclude("/wdn/templates_5.0/includes/local/footer-local.html"); ?>
  <!-- TemplateEndEditable -->
    <?php wdnInclude("/wdn/templates_5.0/includes/global/footer-global-2.html"); ?>
</footer>
<?php wdnInclude("/wdn/templates_5.0/includes/global/noscript.html"); ?>
<?php wdnInclude("/wdn/templates_5.0/includes/global/js-body-local.html"); ?>
<!-- TemplateBeginEditable name="jsbody" -->
<!-- put your custom javascript here -->
<!-- TemplateEndEditable -->
</body>
</html>
