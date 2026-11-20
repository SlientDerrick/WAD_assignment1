# Assignment 1
This node module, subscriptionManager, is use to handle billing cycle of user subscription, make any changes to user, and check that the user have a paid subscription to use or change a function for their music.

To use this node module, 
1. Use a javascript file (app.js) to call the functions and add a require method inside the javascript file for the node module.
2. Use "node app.js" or "nodemon app.js" in the terminal to start the application and show the output of each function from the node module.

## Function 1: Billing a user subscription
Use **billingSubscription()** to bill a selected user subscription based on their date of purchase and today's date. It will also check whether the user have the first month 'Free trial' ("free" in users) of their subscription.

The function will require the username of the users you want to select.  

## Function 2: Change a user subscription
Use **changeSubscription()** to change a selected user subscription to a different subscription. When the user change subscription, the function will remove the 'Free trial', change their date of purchase, and detucted the amount of the new subscription (if any).

The function will require the username of the users and the new subscription different from the selected user.

## Function 3: Create a new user
Use **newUser** to create a new user and the subscription they will have. It will set their username, subscription, date of purchase, and allow them to have 'Free trial'.

The function will require a new username of the new user, and an optional parameter of subscription to set.

## Function 4: Play a song in a album
Use **playSongsWithShuffle()** to play three songs with the shuffle (pick a random song) ON or OFF, depending on the user's subscription. The shuffle can only be turned OFF if the user has a paid subscription.

The function will require the song name to play first, the selected user, and an optional parameter of the state of the shuffle.

## Function 5: Download a song to use offline
Use **offlineDownload** to download a song for a selected user to be use for offline. This function only works if the user has a paid subscription. If you want to see whether the song in added successfully, use console.log the require method with '.offine' (e.g. sub.offine).

The function will require the song name to download, and the username of the selected user.

# References
Spotify Premium: https://www.spotify.com/sg-en/premium/