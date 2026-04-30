# Code Builder

This is simple drag and drop bootstrap layout builder.

It loads reusable HTML snippets from the `templates/` directory, lets you compose them in the browser, and generates a standalone Bootstrap page.

You can add your own code templates by adding an HTML file to the `templates/` directory.
Basic syntax is:

    <p id="name"><< PUT YOUR NAME HERE - THIS WILL BE DISPLAYED IN LIST ON THE LEFT >></p>
    <div id="content">
        << PUT YOUR CODE HERE >>
    </div>

Group them by adding a directory inside `templates/` (currently supports one level down).

Look inside /templates/z-tuts-tests/ for examples/comments

It works like this:
Grab element from the groups on the left and drag it into blue frame under "drop:" label, and drop there.
The code and preview should update automatically.
Add more elements.
You can rearrange them as well. (Though this still needs a little work; for example, you cannot drag before elements, just after them.)

When you're happy just copy the code and do whatever you want with it.
