# Kanban

# How to run

1. Ensure you have the latest [Node.js](https://nodejs.org/en/) LTS installed (version 16.x).
2. [Clone this repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) if you haven't yet.
3. [Install (if you haven't yet) and run MongoDB](https://docs.mongodb.com/manual/installation/) on your local computer.
4. Run `npm install` in the directory, followed by `npm start` to start the API.
5. In a second shell/terminal/command window, navigate to the `client` directory in this repository, once more run `npm install`, followed by `npm start`. This starts the React front end development server.
6. Happy coding!

# Branching

Do not work on the `main` branch. Instead, [create a branch](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches) to work on, named after the feature - for example, if you're working on the job deletion API, you could name your branch `job-deletion-api`.

Once you're done and have pushed your work to the repository, [create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request), which someone then should review, and merge if they approve of it. Please let others know when you opened a pull request - it's easy to miss that someone opened one.

Furthermore, when you create a branch, always make sure that you do so from the `main` branch, and that your local `main` branch is up-to-date using `git pull --rebase` (avoid merges where possible). Otherwise, you might be developing using an older version with possibly more issues and less features!

# Other guidelines

Please use sensible commit messages and pull request titles. For example, don't just use `Fix bug` as a commit message - instead, use `Fix job drag and drop bug in front end` if that is what you did.

# Questions?

Well, you know where we can talk. 😀
