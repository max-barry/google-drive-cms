# Google Drive CMS
A content management system (CMS) built on an interface everyone understands.

## Introduction
The Google Drive CMS lets an admin to use a combination of Google Drive Spreadsheets and Docs to maintain content on a website. These documents are sent as JSON via a POST request to a URL endpoint the admin specifies.

The only **requirements** to run the Google Drive CMS are:
- A duplicate copy of the Google Drive CMS template
- An endpoint to handle the data sent from the spreadsheet

It is possible to run the CMS without fully fledged server side code at your chosen endpoint. Either an admin can export the CMS content as JSON, or you can use a PAAS database with an exposed API. An example of using [Firebase](https://www.firebase.com/) to create the latter of these flows can be found within this documentation.

### Practical examples
The following scenarios are good use cases for the Google Drive CMS:

- A spreadsheet of names and addresses that are sent to an event website's REST API
- A news blog posting rich text content pulled from a Firebase database
- For exporting JSON to consume as part of the generation of a static site through Jekyll
- Triggering and writing email MailChimp campaigns through a Zapier backed service

## Installation
To begin using the Google Drive CMS you need a copy of the core template. This core template contains the default configuration settings and the [Google Apps Scripts](https://developers.google.com/apps-script/) that live under the hood of the Google Drive CMS.

To get a copy of the core template there are 3 options:

1. Add it to you Google Drive direct from [drivecms.xyz](drivecms.xyz)
2. Make a copy of the core template yourself [using this link]()
3. Copy an existing Google Drive CMS template in your Google Drive

After creating a copy of the core template, change the *endpoint* value within the *SETTINGS* sheet. For more information on configuring you Google Drive CMS template, see the [settings]() section of this documentation.

## Understanding the spreadsheet
The core template has four sheets. Each sheet can be accessed from Google Drive's sheet navigation toolbar at the bottom of the page.

### CMS
The main sheet where an admin inputs their data.

#### Headers
The top row of the *CMS* sheet represents the CMS' headers. These are used as the keys against which your data is mapped in the JSON object sent to your endpoint. These behave similar to column names in a standard database. 

#### Field types
Field types let admins add special functionality to a column. There are three field types:

- **Simple** (default): TRUE FALSE values are encoded to JSON as booleans, dates as date objects, numbers as integers and all other values as strings.
- **Eval**: The contents of the cell is run against an `eval` function and stored as-is within the JSON object. Useful for complex data structures or nested objects
- **List**: Provide a comma separated list of items within a cell and have them transformed in to a javascript array. For example, a cell containing `red, blue, green` will be transformed to the array `["red", "blue", "green"]`

n.b. A blank field type will behave like a simple field.

#### Content Rows
Each row beneath the field types will become an object within the JSON array sent to your endpoint. These are the equivalent of a record within a traditional database. Each may represent, for example, a blog post on your site.

## Publishing your content
The Google Drive CMS will add a custom menu option to the top of your Google Sheets interface. The *Google Drive CMS* menu item contains two actions.

**Publish** publishes your content to the provided endpoint

**Export content** exports the contents of your CMS as a JSON to a directory called `_exports` inside of the same Google Drive folder that contains your copy of the base template   

### SETTINGS
Configure the CMS with many settings, including:

- `endpoint` The endpoint the spreadsheet's data is sent to when published
- `debug` Returns the JSON to the admin as an alert, as supposed to sending it to your endpoint. Useful for testing your rows before publishing live on your website
- `saveFile` Whether the Google Drive CMS should save a copy of your exported data as a JSON file. This file is stored in a folder called `_export` found inside the same directory that holds your copy of the core template
- `headers` A javascript object structure containing HTTP headers to send with your request. Useful for passing any key additional information or context to your server. Alternatively use the *options* setting
- `authorization` A configuration value specifically for the authorization header. Overwrites any *authorization* value found within your custom headers
- `options` Additional keys to add to the JSON object sent to your server. If  options are provided, the the array of your CMS' rows will be stored behind a key called `data`
- `requestMethod` Send your CMS records with a PUT, GET or DELETE request method. By default they will be sent via POST


## Best practices
### Securing your CMS
Consider access to your Google Drive CMS spreadsheet like you would the password and email logins for a traditional CMS. If you wouldn't want someone in your WordPress, don't share them access to your spreadsheet!

To better understand the security and sharing potential of Google Drive, [check out Google's documentation](https://support.google.com/drive/answer/2494822?hl=en).

If you are sharing the CMS spreadsheet with other admins, consider locking down parts of the document using protected ranges. For example, protect the headers row of your spreadsheet to prevent another admin breaking a part of your site.

### Revision history
Admins can rollback to previous iterations using Google Drive's [built in revision history](https://support.google.com/docs/answer/190843?hl=en). Restore a previous version of the sheet and then republish the document.
