# Tinymce-bootstrap-Collapse
Bootstrap 4 Accordion plugin for TinyMCE 6

This plugin allows users to create and edit Bootstrap accordions in TinyMCE. Each accordion can have a title and a togglable content section. It can also be set to be opened or closed by default.

##Usage
Clone this repo and place the whole thing in your TinyMCE 6 "plugins" directory.

Then include the plugin in your initialization script, and add it to your toolbar. Something like this:

    tinymce.init({
      selector: "textarea",  // change this value according to your HTML
      plugins: ["bootstrapCollapse"],
      toolbar: 'undo redo | styleselect | bold italic | bootstrapCollapse'
    });

