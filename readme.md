# tblr - Chrome Packaged App

## Description

This app converts your data into a html table.

You can copy data from Excel or a simlar software into this app and it generates the html code for a table with the provided data.

It's possible to change the delimiter within each line. This allows you to generate tables of CSV for instance.

You can also see some statistics about your data like:

* number of rows
* number of columns
* number of empty cells (cells without any data)

## Known issues

It's not supported to paste tables from _Microsoft Office Excel_ that include line breaks.

Why? There's technically no difference between line breaks and a new table row.

## Change log

### 1.3.0 ‒ 2018-03-13

* **[NEW]** Added new option 'First column is `<th>`' (closes #6)
* **[NEW]** Added new column separator: '| pipe' (closes #4)
* **[CHANGE]** Some UI changes
* **[FIX]** Separators '1 or more spaces' and '4 or more spaces' don't treat tabs as spaces any longer (closes #5)

### 1.2.0 ‒ 2016-10-29

* **[NEW]** Added new column separators: '1+ spaces', '4 spaces' (closes #2), '4+ spaces' (closes #3)
* **[CHANGE]** Slightly bigger UI text, some wording changes
* **[FIX]** Text from HTML panel couldn't be selected anymore. (closes #1)

### 1.1.5 ‒ 2015-05-23

* **[FIX]** GitHub links were not working. In Chrome Apps `target="_blank"` is necessary for links to work.

### 1.1.4 ‒ 2015-05-23

* **[CHANGE]** Updated links in the sidebar.
* **[FIX]** Sidebar scrolls correctly now.
* **[FIX]** Get app version dynamically from the manifest file.
* **[FIX]** Using ES6 classes.

### 1.1.3 ‒ 2015-05-21

* **[FIX]** Fixed a typo in the source code that prevented the app from working.

### 1.1.2 ‒ 2015-05-21

* **[FIX]** Link "Change log" points to GitHub repository instead of the old log file now.

### 1.1.1 2015-05-21

* **[FIX]** Fixed warnings and errors pointed out by PhpStorm.

### 1.1.0 2015-05-21

* **[NEW]** Added option to disable output of the `<table>` element.
* **[NEW]** Added option to define cells of the first row as `<th>` elements.
* **[NEW]** Added preview of the table
* **[CHANGE]** Added color to the window frame and changed input and sidebar colors.
* **[FIX]** Updated and optimized the source code since Chrome now supports `let` and `const`.

### 1.0.3 2014-06

* **[FIX]** The window now remembers its size and position.

### 1.0.2 2014-06

* **[NEW]** Added links to a changelog file (which is not existing anymore).
* **[FIX]** More reliable event handling for the options.

### 1.0.1 2014-06

* **[NEW]** Font "Ubuntu Mono" included so everyone can see it.

### 1.0.0 2014-06

* **[NEW]** **Everything** :D ...it was the first version.
