const sub = require("./Derrick_subscriptionManager.js");

sub.billingSubscription("john63");
sub.billingSubscription("free24");

//sub.changeSubscription("free24", "Student");

sub.newUser("wrwr", "Student");

sub.playSongsWithShuffle("song1", "free24", false);

sub.offlineDownload("song1", "john63");
console.log(sub.offline);