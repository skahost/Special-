# Developing with Nebula

Hi there! I'm Emma, the developer behind Nebula.

You are free to edit Nebula to your liking, as long as you do not redistribute or reuse any of Nebula's original source code.
This document exists for the purpose of assisting you with modifying the product you paid for.

That said, please respect Nebula's [End User License Agreement](https://cdn.nebula.style/etc/policies/) (EULA) while doing so.

- Don't provide the Nebula source code publicly or packaged release, even if you make changes to it.
- Do not relicense the Nebula source code or packaged release.

> *Clauses mentioned above are purely for demonstrational purposes and are not legal advice. Read the [End User License Agreement](https://cdn.nebula.style/etc/policies/) in full.*

## Blueprint development tools

Nebula is a Blueprint extension. It uses Blueprint's developer tools.

Unarchive the `nebula.blueprint` folder to your `.blueprint/dev` directory, then use the `blueprint -build` command every time you'd like to save a change.

> **Nebula does not play well with `blueprint -watch`, you may run into issues!!**

[Learn more about developing Blueprint extensions on the Blueprint website](https://blueprint.zip/guides/dev/quickstart)

### Exporting the extension

When you are done making changes, make sure to export it back to a `nebula.blueprint` file so you don't lose your changes!
You can do so using the `blueprint -export` command.

[Learn more about exporting extensions on the Blueprint website](https://blueprint.zip/guides/dev/packaging)

## Prepare your development environment

Nebula uses some additional node modules to make exporting easier, and automatically minify files.

```bash
# Navigate to your Pterodactyl directory.
cd /var/www/pterodactyl

# Install Nebula's development environment dependencies.
yarn add less @node-minify/uglify-js @node-minify/clean-css @node-minify/html-minifier @node-minify/cli
```

### Unminified files

Nebula uses minified js/css/html files in production. Since Nebula `v2.1` we bundle the unminified versions with the theme.

For development purposes, you may want to work with the unminified versions only.
You can replace the minified versions with the following few commands:

```bash
# Navigate to your extension development directory.
cd .blueprint/dev

# Copy all uncompressed library files to the library directory.
cp precompress/libraries/* public/libraries/
```

### Developing on your local machine

I highly recommend to check out [Blueprint Docker](https://github.com/blueprintframework/docker), a Docker image you can run on your local machine with Pterodactyl, Wings and Blueprint.

[Learn more about Blueprint Docker for development-purposes on the Blueprint website](https://blueprint.zip/guides/dev/docker)

## Contributing to the mainline release

If you'd like to implement a new feature, please consider sending an email to [hello@prpl.wtf](mailto:hello@prpl.wtf) with:

- Your feature idea.
- Motivation.
- Questions, if any, that if answered, can help you with your implementation.
- Proof of concept, if needed.

Contributions can be, but not limited to:

- Well-thought-out features.
- Implementations of popular feature requests from [the issue-tracking repository](https://github.com/prplwtf/Nebula/issues).
- Fixes to visual and functional bugs.
- Refactorings of existing code.

That said, please account for the following:

- Vibe-coded AI slop is not permitted. You are allowed to use <30% machine-generated code, but you must be able to fully explain what everything does, and why you implemented it that way.
- Large codebase refactorings are generally advised against.
- Let me know about the feature before you start work on it. Your contribution may not getting added to the mainline release, so it's good to make sure the feature you'd like to implement is welcomed.

### Compensation for your mainline release contributions

Due to the paywall-nature of Nebula, I am willing to award compensation towards implemented features.
You are, however, not entitled to compensation.

I am willing to award $50-100 USD towards high-effort contributions.
This would be provided through PayPal, a Stripe invoice or LTC. 

Nebula does not earn enough to be able to afford corporate-level compensation, but I hope this may be enough to justify spending time of making Nebula better.

## Useful links

Here's a few links that may come in useful when doing anything with Nebula :)

- [Nebula issue-tracking repository](https://github.com/prplwtf/Nebula/issues)
- [Nebula's End User License Agreement](https://cdn.nebula.style/etc/policies/)
- [My GitHub Sponsors page](https://github.com/sponsors/prplwtf)
- Blueprint Docker
  - [The Blueprint Docker repository](https://github.com/blueprintframework/docker)
  - [Guide to installing Blueprint Docker for development purposes](https://blueprint.zip/guides/dev/docker)
- Blueprint Documentation/Guides
  - [Guide to extension development](https://blueprint.zip/guides/dev/quickstart)
  - [Guide to exporting extensions](https://blueprint.zip/guides/dev/packaging)

## Some words about tech-debt

I made a lot of mistakes in Nebula's source code.
Well, general mistakes with how Nebula themes and handles things, it still works nonetheless.

I was quite a lot younger when I started work on this theme, and it's had some bumps and issues that had to be dealth with.

Over time, I may refactor certain areas of Nebula, alongside my Blueprint open-source maintenance work.

Tech-debt exists in Nebula.
Stuff may be overcomplicated.
Stuff may break in weird ways.

I hope you're able to look through these weak points, and maybe help solve them through contributing (mentioned earlier in the document).

# Final words

Thank you for using Nebula and choosing to develop with it, I really appreciate it.

If you have any questions, please do not hesitate to reach out via email. You can reach me at [hello@prpl.wtf](mailto:hello@prpl.wtf).

Kind regards, \
Emma
