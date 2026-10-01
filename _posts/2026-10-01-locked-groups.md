---
layout: post
title: "The Roblox locked group problem"
url: /locked-groups/
description: A portion of Roblox groups are locked and ownerless, but still taking space. What does this mean?
---

In November 2022, I made a post on the Roblox DevForum titled ["59% of Roblox groups have no owner (and why this is a problem)"](https://devforum.roblox.com/t/59-of-roblox-groups-have-no-owner-and-why-this-is-a-problem/2066757). I've recently been seeing some engagement on it again, so out of curiousity, I took a glance at the data I extracted.

To say the least, it was flawed in a couple of ways, and I made some misinformed conclusions. I'd like to give better data and conclusions today.

# What my old testing claimed
In 2022, I claimed that 59% of groups on Roblox have no owner and are locked. This meant that over half of groups on Roblox were taking group names with no real purpose.

# What I'm changing
Basically everything I'm testing is different. Using Lune, I made a CLI tool that analyzes random groups from a pool up to a maximum ID of `481567712` (the ID of a friend's recent group). The CLI randomly picks groups from that range and analyzes a few things, like:
* Is it locked?
* Is it ownerless?
* How many members does it have?
* Is there a terminated owner?
* Are there any published games?
* Are there any terminated games?
* Are there any published UGC?
* How old is it?
* Is it a verified group?

Tracking all of these gives a more complete picture of what is happening, allowing me to make a more nuanced and meaningful conclusion other than just "oh well this sucks and Roblox should change something".

# The data
In a sample size of 10000 groups, about 1.5% of groups on Roblox are locked. Among locked groups, 7.1% of them are ownerless. Otherwise, half of the groups have a terminated owner account. The median number of members per group was 21.5, mean is 2605.21, and max was 24979. Pretty much none of them had a published game, thus there were no terminated games in tested groups. Also, none of these locked groups had UGC published. The median age of a locked group is ~17 years. None of them had a verified badge.

However, this data is using *locked* groups as the core measurement. What if we're measuring based on *ownerless* groups?

In a sample size of 1000 groups, about 39.4% of groups on Roblox are ownerless. Among ownerless groups, 0.76% of them are locked. The median number of members was 0, mean 2.5, and max 498. Only 1.27% of the ownerless groups had a published game, and 6.09% had published UGC. None of them were verified. The median age of these groups is also ~17 years.

# Interpretation

There is a critical difference between closed groups and locked groups. Locked groups are inaccessible and frozen by Roblox moderation; this can usually be for reasons such as Robux laundering, innapropriate behavior, etc. Closed groups are ones that owners had left.

A group of any size seems to be locked, small or big. Given that half of locked groups have a terminated owner, this means that moderation is fairly proactive about closing groups associated with bad actors.

Both locked and/or ownerless groups are usually very old, averaging at 17 years of age. This means that most new groups are not ownerless nor locked.

No closed or locked group was verified. It's difficult to interpret what this means, as it's possible that it's an effect of a small sample size relative to the platform.

Ownerless groups have less members than locked ones by a long shot, almost always being at 0 members. This means that they are stored on servers and reserving a name without having any use.

# My opinion
To be honest, none of this is really that impactful. It's just a bit annoying.

Years ago, Roblox had a feature that allowed you to claim ownerless groups. This meant there was a free route to owning a group, and also preventing an unused group name from going to waste.

As of right now, some simpler and shorter group names are no longer available because of these locked and/or ownerless groups. I believe that the best way to solve this is to allow users to re-use group names that are originally from locked groups, or alternatively, to allow users to claim non-locked ownerless groups.

That being said, I'm more interested in how many ownerless groups have no members. I'm willing to bet that many users on Roblox created a group but never advertised it anywhere, and thus is gained no members. It's also possible that these groups had a small number of members, but those accounts left the groups over time.

I don't know why so many groups are ownerless. Were they terminated? If so, it's interesting how the group was not locked as well, instead being closed.

Hopefully this updated data is at least a bit interesting. I had to run CLI tools for days to get all of this data, and I feel it was totally worth it!