# Restaurant Reviews Web App
---

## Mobile Web Specialist Nanodegree

### overview
This is a project I had to finish so that I can pass the `Mobile Web Specialist Nanodegree` from Udacity, and earn the [certificate](https://confirm.udacity.com/JZGH7N7N).

It’s a 3 stages project in which I have converted a non
usable static site to a mobile-ready web application

- In stage 1:

I’ve converted the design to be responsive on different
sized displays and accessible for screen reader use.

- In stage 2:

I was given a back-end server, and I added the ability to
read `JSON` from that server `Asynchronously` using the `Fetch API` and display the data in the
app. Then I saved the website main structure and images in `cache` using a `service worker` and stored the restaurant information/list in `indexedDB` to achieve a good Offline first experience, and met a
site performance target of 70%.

- In stage 3:

I implemented review submission logic on the client
side, and leveraged offline capabilities so that users are
able to write a review offline or mark a restaurant as a
favorite while offline, then it’s deferred, and sent to the
server when it's back online.

And `Lighthouse` targets for each category had to exceed:

- Progressive Web App: >90
- Performance: >90
- Accessibility: >90 

### What do I do from here?

1. In the `/dist` folder, start up a simple HTTP server to serve up the site files on your local computer. Python has some simple tools to do this, and you don't even need to know Python. For most people, it's already installed on your computer. 

In a terminal, check the version of Python you have: `python -V`. If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.) For Python 3.x, you can use `python3 -m http.server 8000`. If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.

2. Set up the restaurants server by following the instructions in [mws-restaurant-stage-3](https://github.com/udacity/mws-restaurant-stage-3)

3. With your servers running, visit the site: `http://localhost:8000`.

### Audit

To audit this site use the `audit` tab on Chrome's DevTools in `Incognito` mode to avoid having extensions interefere with the tests.

### Resources

- The logo image is from [dryicons.com](https://dryicons.com/free-icons/restaurant)
- The heart icon is made by [Smashicons](https://www.flaticon.com/authors/smashicons) from [www.flaticon.com](https://www.flaticon.com/) and is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)


