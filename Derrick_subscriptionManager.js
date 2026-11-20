 let subscriptionManager = {
    //Databases
    users : [
        {"username": "derrick12", "subscription": "Student", "date": "2026-03-16", "free": false},
        {"username": "john63", "subscription": "Individual", "date": "2026-10-17", "free": true},
        {"username": "free24", "subscription": "None", "date": "None", "free": true},
    ],

    subscription : [
        {"subscription": "Individual", "price": "11.98"},
        {"subscription": "Student", "price": "6.98"},
        {"subscription": "None", "price": "0"}
    ],

    songs : [
        {"songname": "song1", "artist": "artist1"},
        {"songname": "song2", "artist": "artist1"},
        {"songname": "song3", "artist": "artist1"},
        {"songname": "song4", "artist": "artist2"},
        {"songname": "song5", "artist": "artist2"},
    ],

    offline : [],

    // Pay Billing Cycle
    billingSubscription(username) {
        //Find the user
        const selectedUser = this.users.find(u => u.username == username);
        if (selectedUser)
        {
            //Return if the selected user does not have a subscription
            if (selectedUser.subscription == "None")
            {
                console.log("This user (" + username + ") does not have a subscription");
                return
            }

            const today = new Date();
            const userDate = new Date(selectedUser.date);
            
            //Calcalute the month and day difference
            const monthDiff = (today.getFullYear() - userDate.getFullYear()) * 12 +
            (today.getMonth() - userDate.getMonth());
            const dayDiff = userDate.getDate() - today.getDate();
 
            //Free trial for the first month of the first new paid subscription
            if (selectedUser.free == true)
            {
                //Show that user have Free trial for the first month
                if (monthDiff <= 1 && dayDiff < 0)
                {
                    console.log("Free trial");
                    return
                }
                //Show that the Free trial has ended
                else if (monthDiff == 1 && dayDiff == 0)
                {
                    selectedUser.free = false;
                    console.log("Free trial ended");
                    return
                } 
            }
            
            //Pay the monthly subscription fee
            else if (monthDiff >= 2 && dayDiff == 0)
            {
                const selectedSub = this.subscription.find(s => s.subscription == selectedUser.subscription);
                console.log("$" + selectedSub.price + " deducted");
                return
            }
            else
            {
                console.log("Have not reached subscription date");
                return
            }      
        }
        else
        {
            console.log("This user (" + username + ") cannot be found");
            return
        }
    },

    // Change Subscription
    changeSubscription(username, newSubcription){
        //Find the user & subscription
        const selectedUser = this.users.find(u => u.username == username);
        const selectedSub = this.subscription.find(s => s.subscription == newSubcription)
        if (selectedUser && selectedSub)
        {
            if (newSubcription != selectedUser.subscription)
            {
                //Change subscription
                if (newSubcription != "None")
                {
                    //Change to paid subscription, change date, and remove the free trial
                    selectedUser.subscription = newSubcription;
                    selectedUser.date = new Date().toISOString().split("T")[0];
                    selectedUser.free = false;
                    console.log("Subscription changed. $" + selectedSub.price + " detucted");
                    return
                }
                else
                {
                    //Cancel the subscription, and remove the free trial
                    selectedUser.subscription = newSubcription;
                    selectedUser.date = "None";
                    selectedUser.free = false;
                    console.log("Subscription canceled.")
                    return
                }
                
            }
            else
            {
                console.log("This user (" + username + ") have the same subscription");
                return
            }
        }
        else
        {
            console.log("User (" + username + ") or subscription (" 
                + newSubcription + ") cannot be found");
            return
        }
    },

    // New User
    newUser(username, subscription = "None"){
        //Find whether username is taken
        const selectedUser = this.users.find(u => u.username == username);
        if (!selectedUser)
        {
            if (subscription != "None")
            {   
                //Create a user with a paid subscription
                const selectedSub = this.subscription.find(s => s.subscription == subscription)
                if (selectedSub)
                {
                    today = new Date().toISOString().split("T")[0];
                    this.users.push(
                        {"username": username, "subscription": subscription, "date": today, "free": true}
                    );
                    return
                }
                else
                {
                    console.log("Subscription incorrect.");
                    return
                }
            }
            else
            {
                //Create a user without a paid subscription
                this.users.push(
                    {"username": username, "subscription": "None", "date": "None", "free": true}
                );
                return
            }
        }
        else
        {
            console.log("Username has been taken.")
            return
        }
    },

    // Play a song (shuffle)
    playSongsWithShuffle(songName, username, shuffle = true){
        const selectedSong = this.songs.find(s => s.songname == songName);
        const selectedUser = this.users.find(u => u.username == username);
        if (selectedSong && selectedUser)
        {
            if (shuffle == false && selectedUser.subscription == "None")
            {
                shuffle = true;
                console.log("Shuffle cannot be turned off.");
            }

            //
            let count = 3;
            let currentSong = selectedSong;
            const albumList = setInterval(() => {
                if (count == 0)
                {
                    clearInterval(albumList);
                    console.log("Stop Music");
                    return
                }
                else
                {
                    console.log("Next song")
                    if (shuffle == true)
                    {
                        const nextSong = this.songs[Math.floor(Math.random() * this.songs.length)]
                        console.log(nextSong);
                    }
                    else
                    {
                        const matchingSongs = this.songs.filter(
                            song => song.artist === currentSong.artist
                        );

                        const currentIndex = matchingSongs.indexOf(currentSong);

                        const nextSong =
                            matchingSongs[(currentIndex + 1) % matchingSongs.length];
                        
                        console.log(nextSong);

                        currentSong = nextSong;
                    }
                    count--;
                }
            }, 2000);
        }
        else
        {
            console.log("User (" + username + ") or song (" 
                + songName + ") cannot be found");
            return
            
        }
    },

    // Offline downloads (Need sub)
    offlineDownload(songName, username){
        const selectedSong = this.songs.find(s => s.songname == songName);
        const selectedUser = this.users.find(u => u.username == username);
        if (selectedSong && selectedUser)
        {
            if (selectedUser.subscription != "None")
            {
                this.offline.push({"song": selectedSong.songname, "user": selectedUser.username})
                console.log("Downloading...");

                setTimeout(() => {
                    console.log("Finished download");
                }, 2000);
            }
            else
            {
                console.log("Need subscription to download");
                return
            }
        }
        else
        {
            console.log("User (" + username + ") or song (" 
                + songName + ") cannot be found");
            return
        }
    }
}

module.exports = subscriptionManager;