const sub = require("./Derrick_subscriptionManager.js");

// sub.billingSubscription("derrick12");
// console.log("")
// sub.billingSubscription("secret2");
// console.log("")
// sub.billingSubscription("john63");
// console.log("")
// sub.billingSubscription("free24");

// sub.changeSubscription("free24", "Student");

// sub.newUser("wrwr", "Student");

// sub.playSongsWithShuffle("song1", "free24", false);
// sub.playSongsWithShuffle("song4", "derrick12", false);

sub.offlineDownload("song1", "john63");
setTimeout(() => {
    console.log(sub.offline)
}, 3000)

