# codebuilder

This is simple drag and drop bootstrap layout builder.

Has many issues to be yet resolved, but works :)

You can add your own code templates by adding a html file to /templates/ directory.
Basic syntax is:

    <p id="name"><< PUT YOUR NAME HERE - THIS WILL BE DISPLAYED IN LIST ON THE LEFT >></p>
    <div id="content">
        << PUT YOUR CODE HERE >>
    </div>

Group them by adding a directory inside /templates/ (currently supports only one level down sorry)

Look inside /templates/z-tuts-tests/ for examples/comments

IT Works like this:
Grab element from the groups on the left and drag it into blue frame under "drop:" label, and drop there.
The code and preview should update automatically.
Add more elements.
You can rearange them as well. (though this still needs little work - f.e. you cannot drag before elements, just after them)

When you're happy just copy the code and do whatever you want with it.

Sorry for crappy code, have fun :)
