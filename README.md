# Clockwork SMS sender dashlet for SugarCRM 7.6.*

## Clockwork SMS Dashlet

A SMS sending Dashlet for SugarCRM 7.6.* that can be used on the **record** views of the **Accounts** and 
**Contacts** modules only.

## What is Clockwork SMS

Clockwork is an enterprise SMS service that provides an API for sending SMS.
This Dashlet leverages their PHP wrapper (included) to communicate with the API to send
out SMS messages.

The Dashlet is enabled for the **Accounts** and **Contacts** record views.

Pre-requisite
-------------

A [Clockwork](http://clockworksms.com "Clockwork") account

You can register for a key for free and if you link a mobile number then you'll get a
50 pence (UK currency) credit. Each SMS costs about 5 pence.


## Easy Installation

This is the painless way of installing the dashlet into a Sugar instance 

### Download the installable package zip

If you're not interested in the code then
you can download the prebuilt zip file which is ready to be installed with module loader.
__Please be aware that the zip may not always be up to date with the code. The only way to
 have the latest and greatest is to clone the repo and build the installable package__
 
On the GitHub page for the repo you should see a tag with "release". Click on the link
and you should see the release notes and a download link for __clockworksms.zip__

Click the link and you should start the download of the installable package.

## Using the Dashlet

Once the installable package has been installed via Module Loader, you can configure 
the SMS dashlet for the __Accounts__ and __Contacts__ modules. The dashlet will be
visible in the detail views __only__.

### The API key

Before you can use the dashlet you'll need to configure a Clockwork API key that will
be used instance wide. The key can be configured in the __Admin__ page and is located
at the bottom of the page.

### Using

When the dashlet has been added then inside Account and Contact records the dashlet
will detect all phone numbers in the record and make them available via a dropdown
list. You can choose one of the numbers in the dropdown list or choose to use another 
one.

Add a message to be sent, an optional "From" name, and then click send.

### To Numbers

The Dashlet will try and recognize a few different number formats. Ideally the format
should be country code + number with no spaces and no special characters. For example, a
valid number for a German mobile number might be:

491234567893 (49 is the country code and the rest is the number).

Using the number as an example, the dashlet will recognize the following formats:

+49 123 456 7893
(+49) 123 456 7893
+491234567893
(+49)1234567893

## Ninja installation

As with most things that are Ninja-like, this requires more steps and you'll
need to install things like NodeJS and Grunt. If you're doing other development at the
moment then you might already have these and so it becomes quite straight forward.

### Clone the Repo

#### Prerequisites
 
 * NodeJS
    * Mac: The preferred way of installing NodeJS on OSX is via Homebrew.
    * Windows: There is a NodeJS installer for Windows. See __https://nodejs.org/en/__
 * NPM : npm comes with NodeJS. So once you install NodeJS you should also have npm
 
To test that you have both NodeJS and npm installed you can type the following commands in to the terminal
> node --version

> npm --version

each should provide version numbers.    

* Grunt: Grunt is a javascript task runner which is similar to ANT if you have
 experience in the Java world. Installing Grunt requires npm. Once npm is installed
 you can install Grunt by typing the following command:
 
> npm install -g grunt-cli
 
 
#### Building the installable package
 
 First thing you'll need to do is run open a terminal (Windows DOS prompt) and change
 to the base directory of the repo you just cloned. For example, if the repo was cloned
 into the following directory: __C:\myhome\clockwork_dashlet__ then change into this
 directory and run the following command:
 
> npm install

This command installs all dev dependencies for the project. 

Once dev dependencies are installed issue a:

> grunt build

You should output similar to the following:

> Running "zip:long-format" (zip) task
>
> File "build/clockworksms.zip" created.
>
> Done, without errors.

If the ouput looks Ok then you should find a new folder called __build__ that
has been created and inside the folder you'll find a zip file which is the installable
package. You can use module loader to load and install the package.

Have fun.

 
 





