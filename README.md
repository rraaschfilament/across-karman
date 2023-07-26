This is a React app build using Vite to be hosted by the client as Interactive Content in their Drupal site.

Local set up:
1) Clone the repo
2) npm run dev to start a local server

Hosting on Drupal:
1) npm run build
2) Make a .zip file of all the files/folders inside across-karman/dist.
   2.5)It is very important that the zip file has the index.html file at the root.  So, if the zip file is encased in a "dist" folder, it will not work.
   I got around this by going into the dist folder in file explorer, selecting everything in it ("assets", index.html, vite.svg), right clicking on it and selecting Compress from the drop down.
4) Navigate to the Staging site (https://staging-5em2ouy-vhwn6ssatul7c.us-2.platformsh.site/filament-games-test-page) and click Edit.
5) Expand the Related Content section, click Add Interactive Content.
6) Choose the zip file to upload.
7) Set the width to 0 and the height to 900.  Do not check the box.  You can name the content something helpful.
8) Save, and you're done.  Make sure to view in an incognito window and not in the window where you're logged in as an Admin, because Admins have additional menus that will not be included in the average user experience.
