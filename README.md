# homepage

simple homepage with primitive terminal.

https://simple-homepage.netlify.app/

## Terminal usage example:

> bookmarks_add --name "youtube" --url "https://www.youtube.com/"

This adds a new bookmark to local storage.

> bookmarks

List of bookmarks stored in local storage.

> bookmarks_rm --name "youtube"

This removes specific bookmark from local storage.

> init add "bookmarks"

This will add the command `bookmarks` as a init task.
Each init task will be executed when the page is loaded. In this case we'll get a list of bookmarks.