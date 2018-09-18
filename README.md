# lolstats

--Lessions Learned:

This was definetly pretty tough, my start with wanting to use vue definetly impacted hard on my ability to do this project. I had to debug and try to solve issues that had nothing to do with the project on top of the issues already with the project. I'd definetly want to do this over with not vue because it caused alot of problems maybe I wouldn't even use a framework. I feel I could have also avoided all the heroku and CORS trouble if I stayed away from vue. Maybe not CORS... but definetly heroku, it seemed to be a issue with webpack and babel or something. I wasn't able to use kayn or LeagueJS because somehow it broke when I tried to add to Vue, in hindsight I definetly should have ditched Vue for those libraries instead of the other way around however I was convinced this was better for me at the time. That was definetly my mistake. 

Also the League of Legends API was tricky to navigate, from the signup and needing to redownload the game to make the in game name to be able to get the api key. You need to get request by the name to get an id, to get match history, to get matches and from there you can get specifics for that match. Lots of calling. And best of all, at the end you need to reference documents to see what these ids and keys even link to. Very frustrating. 

--If this was a production app how would you handle the rate limiting. 

For the rate limiting issue I would think that having our own database that holds data when a user refreshes their profile would work pretty well. The principle is that league games usually tend to last over 20 minutes each, so there's no real need to refresh every time, and by having the user data in our server it would be served faster as well on top of not clogging the api.

--If you could architect a solution that would work on production at scale how would you design that system 

Building off that idea up above with the database of our own to hold user information and not having to rely on constantly pinging the api to get data, we could build pretty much our own site that first shows our data of the players / matches and if they are outdated using a comparision to either time or a manual update. Then at that point we could hit the api to update our database. This solution should work to alleviate rate limiting issues and if there are any issues with our database then our systems are mostly contained so it is more accessible to fix. 