# Google Drive CMS
A content management system (CMS) built on an interface everyone understands.

[www.drivecms.xyz](https://www.drivecms.xyz/)

## Introduction
The Google Drive CMS uses a combination of Google Sheets and Google Docs to maintain content on a website. These documents are sent to a site or a supporting service (e.g. [a Firebase database](https://words.mxbry.com/how-i-used-google-drive-and-firebase-to-give-my-static-site-a-cms-7226e01a51b5#.umrt2gwpz)) via a POST request to an API the admin specifies.

The only **requirements** to run the Google Drive CMS are:
- A duplicate copy of the Google Drive CMS template
- An API endpoint to handle the data sent from the spreadsheet

It is possible to run the CMS without writing server side code at the chosen API endpoint. The CMS' content can be exported as a JSON file, or it can be added directly to any PAAS databases that expose an API. An example of using [Firebase](https://www.firebase.com/) to create the latter of these flows can be found on our [examples page](/examples.html).

### Practical examples
The following scenarios are good use cases for the Google Drive CMS:

- A spreadsheet of names and addresses that are sent to an event website's REST API
- A news blog posting rich text content pulled from a Firebase database
- For exporting JSON to consume as part of the generation of a static site through Jekyll
- Triggering and writing email MailChimp campaigns through a Zapier backed service

---

## Installation
To begin using the Google Drive CMS you need a copy of the core template. This core template contains the default configuration settings and the [Google Apps Scripts](https://developers.google.com/apps-script/) that live under the hood of the Google Drive CMS.

To get a copy of the core template there are 3 options:

1. Add it to you Google Drive direct from [drivecms.xyz](https://drivecms.xyz)
2. Make a copy of the core template yourself [using this link](https://docs.google.com/spreadsheets/d/15ifxjEo9nVXTbeX7mwLnW-F5yu96u9IF1RL3wHoYLbs/edit?usp=sharing)
3. Copy an existing Google Drive CMS template in your Google Drive

After creating a copy of the core template, change the endpoint value within the *SETTINGS* sheet. For more information on configuring your Google Drive CMS template, see the [settings](#settings) section of this documentation.

### Publishing content
The Google Drive CMS will add a custom menu option to the top of the Google Sheets interface. The Google Drive CMS menu item contains two actions.

**Publish** publishes the CMS' content to the designated endpoint

**Export content** exports the contents of the CMS as a JSON file to a directory called `_exports` inside of the same Google Drive folder that contains the base template itself

---

## Understanding the spreadsheet
The core template has four tabs. Each tab can be accessed from Google Drive's tab navigation toolbar at the bottom of the page.

### CMS
The main tab where an admin inputs their data.

#### Headers
The top row of the *CMS* tab represents the content's headers. These are used as the keys to map the content's data against in the JSON object sent to your endpoint. Headers behave similar to column names in a standard database.

![Example of headers for a blog's CMS](http://drivecms.xyz/img/documentation/headers.png "Example of headers for a blog's CMS")

#### Field types
Field types let admins add special functionality to a column. There are three field types, currently:

- **Simple** (default): TRUE FALSE values are encoded to JSON as booleans, dates as date objects, numbers as integers and all other values as strings.
- **Eval**: The contents of the cell is run against an `eval` function and stored as-is within the JSON object. Useful for complex data structures or nested objects
- **List**: Provide a comma separated list of items within a cell and have them transformed in to a JavaScript array. For example, a cell containing `red, blue, green` will be transformed to the array `["red", "blue", "green"]`
- **Google Sheet**: Point at another Google Sheet to create nested objects. See [Nested data](#nested-data) for more information

n.b. A blank field type will behave like a simple field.

We are looking to add more in the future, including foreign key relationships between multiple sheets. Eval is a good stopgap for more complex data, as it can accept raw JavaScript arrays or objects. *Update* Google Drive CMS now supports pointing at [other Google Sheets](#nested-data) to create neater nested objects.

#### Content rows
Each row beneath the field types will become an object within the JSON array sent to the designated API endpoint. These are the equivalent of a record within a traditional database.

For example, an individual blog post is a content row, and it might have headers like "title" or "publication date".

### Settings
The *SETTINGS* tab within the Google Drive CMS template allows customization the CMS' behavior.

The following settings can be configured:

- `endpoint` The endpoint the spreadsheet's data is sent to when published
- `debug` Returns the JSON to the admin as an alert, as supposed to sending it to the designated endpoint. Useful for testing content rows before publishing on a live site
- `saveFile` Whether the Google Drive CMS should save a copy of your exported data as a JSON file. This file is stored in a folder called `_export` found inside the same directory that holds the copy of the core template that requested the save
- `headers` A JavaScript object structure containing HTTP headers to send with your request. Useful for passing any key additional information or context to your server. Alternatively use the *options* setting
- `authorization` A configuration value specifically for the authorization header. Overwrites any *authorization* value found within your custom headers
- `options` Additional keys to add to the JSON object sent to your server. If options are provided, then the content rows of the CMS will be stored behind a key called `data`
- `requestMethod` Send the CMS' content with a custom request method, like PUT, GET or DELETE. By default the API will be contacted via via POST request


### _internals
It might be best to just leave this alone. Values in this tab power current and future functionality at a low level.

---

## Advanced features
### Nested data
*NEW*
Use a field type of `Google Sheet` to nest other Google Drive CMS sheets inside of your POST data.

1. *Create a secondary Google Drive CMS* The only sheet we really need is the default `CMS` sheet. You could alternatively create a blank Google Sheet with 2 rows (headers and field types), and your data underneath. The `SETTINGS`, `DOCUMENTATION` and `_internals` sheets on your secondary spreadsheet are not used.
2. Copy and past the URL or spreadsheet ID in to your Drive CMS. Remember to set the field type to `Google Sheet`.
3. Publish as normal

Any data in the second spreadsheet will be added to your JSON payload as a nested array.

#### Example

*Google Sheet A (your Google Drive CMS instance)*

| title  | nested |
| -----  | ------ |
| *String*  | *Google Sheet* |
| A cool title  | < URL of Google Sheet B >  |
| Another cool title  |  |

*Google Sheet B (the data you want to nest)*

| FieldA  | FieldB |
| -----  | ------ |
| *String*  | *String* |
| Content that is nested  | Content that is also nested  |
| Second nested item  | Some information |

*Result*
```
[
  {
    "title": "A cool title",
    "nested": [
      {
        "FieldA": "Content that is nested",
        "FieldB": "Content that is also nested"
      },
      {
        "FieldA": "Second nested item",
        "FieldB": "Some information"
      }
    ]
  },
  {
    "title": "Another cool title",
    "nested": ""
  }
]
```

You could probably nest sheets within sheets within sheets. That would probably work.
Don't point spreadsheets at each other. That's going to end in a loop. That would probably be bad.

### Rich text
It is possible to combine the Google Drive CMS core template with Google Docs to give an admin a rich text editor.

Write a standard Google Doc using Google Doc's built in rich text capabilities (headings, links, inline imagery, etc.). Give that doc share settings that would allow the owner of the CMS core template at least view access. Add just the URL of that Google Doc to a cell within a content row of the CMS, and when published the Doc will be transformed in to raw HTML tags and added to the JSON payload.

Google Docs are structured such that they can be exported straight to HTML. The CMS performs light sanitization of the converted HTML, but otherwise it is returned as a string within the JSON document upon publishing.

#### Image replacement
Images inserted in to Google Docs are hosted on Google's CDN. When the rich text is extracted you'll have `img` tags with a `src="https://cdn.google.com/..."`. That's okay-ish for small projects, or projects where images aren't vital. Google rate limit access to these URLs meaning every now and again your images will fail to load, as the Google CDN returns a 403.

To get around this Google Drive CMS provides support for externally hosted images. In your rich text Google Doc that is being consumed by the drive CMS add the following inline:

```
This is the text content written in my Google Doc and here is my pretty image:

[IMAGE:https://media.giphy.com/media/l46CqLVMWzaJUFPLW/giphy.gif]

And then my text carries on like normal.
```

When the rich text is extracted and posted to your JSON api your `img` tag will now have a source of `https://media.giphy.com/media/l46CqLVMWzaJUFPLW/giphy.gif` (`[IMAGE:]` is replaced). Using externally hosted images also allows you to use image formats that a Google Doc doesn't natively support (Gifs!).

### Slugify
A common CMS requirement is a slug field. A slug field can be used to build URLs on a site, and is often a concatenation of a title field with hyphens. For example, a news article called "Big Announcement Coming" would have a slug of "big-announcement-coming".

To expedite this process the Google Drive CMS has a shortcut function called SLUGIFY. Add the cell function `=SLUGIFY(:cell:)` to a cell in the CMS sheet, where :cell: is any string input (e.g. the corresponding cell in a *title* column).

---

## Best practices
### Securing the CMS
Consider access to the Google Drive CMS spreadsheet like the password and email logins for a traditional CMS. If you wouldn't want someone in your WordPress, don't share them access to your spreadsheet!

To better understand the security and sharing potential of Google Drive, [check out Google's documentation](https://support.google.com/drive/answer/2494822?hl=en).

If sharing the CMS spreadsheet with other admins, consider locking down parts of the document using protected ranges. For example, protect the headers row of the spreadsheet to prevent another admin breaking a data structure the API endpoint requires.

### Revision history
Admins can rollback to previous iterations using Google Drive's [built in revision history](https://support.google.com/docs/answer/190843?hl=en). Restore a previous version of the sheet and then republish the document.

### Extending the CMS
All of the Apps Scripts that power the CMS are baked in to the sheet an admin edits. These scripts can be accessed via `Tools > Script editor...` from the Google Sheets toolbar. We've tried to comment the .gs files where possible, so hack and extend at will! Changes to these scripts will only effect the current instance of the CMS.
