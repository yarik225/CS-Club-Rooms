/*
    Room Cards JavaScript Utilities - JavaScript utilities for AESHS CS club website
    Copyright (C) 2025  Tyler Yeh

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

// Room Cards Utilities by Tyler Yeh, November 2025, AESHS Computer Science Club

// This defines an E-Board member to be shown in a club card
// contact is an object with the `type` attribute being 'email' or 'text', and the `content` attribute being an email or some other text.
// The code does not validate name, imageURL, or role because people probably won't pass anothing other than strings to them.
export class ClubCardEBoardMember {
    constructor(name, imageURL, role, contact) {
        // Name - self-explanatory
        this.name = name;
        // Image URL - the URL to fetch the image for the E-Board member
        this.imageURL = imageURL;
        // Role - Open-ended - This is a string containg the role of the E-Board member
        this.role = role;
        // Contact - contact type and content
        // Validate contact
        if(typeof contact !== "object") { // Wrong type
            throw new TypeError("ClubCardEBoardMember `contact` parameter is required and must be an object.")
        } else if(!( // Inside !() is the correct structure of the `contact` object.
            
            (contact.type === "email" || contact.type === "text")
            
            &&
            
            (typeof contact.content === "string")
        )) {
            throw new Error("ClubCardEBoardMember `contact` must have valid keys and values. Refer to documentation if you don't know what I mean.")
        }
        
        // Set the contact of the E-Board member
        this.contact = contact;
    }
    
    // Render this member's info to HTML for the club card
    renderHTML() {
        const itemEl = document.createElement("div");
        itemEl.classList.add("clubEBItem");
        
        // The image for the E-Board member (div with background image), append it to the item element.
        const imageEl = document.createElement("div");
        imageEl.classList.add("clubEBImage");
        imageEl.style.setProperty("background-image", `url('${this.imageURL}')`);
        itemEl.appendChild(imageEl);
        
        // The description area for the E-Board info, append it
        const descAreaEl = document.createElement("div");
        descAreaEl.classList.add("clubEBDescription");
        itemEl.appendChild(descAreaEl);
        
        // The name of the E-Board member
        const nameEl = document.createElement("span");
        nameEl.classList.add("clubEBName");
        nameEl.textContent = this.name;
        descAreaEl.appendChild(nameEl);
        
        // The role of the E-Board member
        const roleEl = document.createElement("span");
        roleEl.textContent = this.role;
        descAreaEl.appendChild(roleEl);
        
        // The contact for the E-Board member - this gets tricky
        // If it's an email, we put it inside of a link, otherwise, a span.
        
        const contactEl = document.createElement(
            this.contact.type === "email" ? "a" : "span"
        );
        
        contactEl.textContent = this.contact.content;
        
        // If it's an email, we set the link href
        if(this.contact.type == "email") {
            contactEl.href = `mailto:${this.contact.content}`;
            contactEl.classList.add("clubEBEmail");
        }
        
        // Append the contact element to the description area element.
        descAreaEl.appendChild(contactEl);
        
        // Return the final product
        return itemEl;
    }
}

// The Club Card CLASS, not the HTML element.
// Only club E-Board members are validated (it might be confusing to some)
export class ClubCard {
    constructor(clubCardInfo) {
        const {
            clubName,
            clubImageURL,
            clubDescription, // String
            clubEBoardMembers // Array of ClubCardEBoardMember
        } = clubCardInfo;
    
        // Validate clubEBoardMembers
        for(const member of clubEBoardMembers) {
            if(!(member instanceof ClubCardEBoardMember)) {
                throw new TypeError("clubEBoardMembers must be an array of the ClubCardEboardMember class!")
            }
        }
        
        // Assign everything to this instance of ClubCard
        this.clubName = clubName;
        this.clubImageURL = clubImageURL;
        this.clubDescription = clubDescription;
        this.clubEBoardMembers = clubEBoardMembers;
    }
    
    // Renders into and returns an HTML element
    // See index.html and styles.css if you want to learn more.
    renderHTML() {
        // Create the club card element
        const cardEl = document.createElement("div");
        cardEl.classList.add("clubCard");
        
        // Create the heading with the name, then append it to the club card
        const headingEl = document.createElement("div");
        headingEl.classList.add("clubHeading");
        
        headingEl.textContent = this.clubName;
        cardEl.appendChild(headingEl);
        
        // Create the club content area - Anything and everything that's not the header should go in here. Append it to the club card.
        const contentEl = document.createElement("div");
        contentEl.classList.add("clubContent");
        cardEl.appendChild(contentEl);
        
        // Create the club card description area, then append it to the card content
        const descAreaEl = document.createElement("div");
        descAreaEl.classList.add("clubDescriptionArea");
        contentEl.appendChild(descAreaEl);
        
        // Create the image (div with background image), then append it to the description area
        const clubImageEl = document.createElement("div");
        clubImageEl.classList.add("clubImage");
        
        clubImageEl.style.setProperty("background-image", `url('${this.clubImageURL}')`);
        descAreaEl.appendChild(clubImageEl);
        
        // Create the description text, set the text to the description, then append it to the description area
        const descTextEl = document.createElement("div");
        descTextEl.classList.add("clubDescriptionText");
        descTextEl.textContent = this.clubDescription;
        descAreaEl.appendChild(descTextEl);
        
        // Now comes the seperator - Create it and append it to the card content.
        const seperatorEl = document.createElement("div");
        seperatorEl.classList.add("clubContentSeperator");
        contentEl.appendChild(seperatorEl);
        
        // Now, the E-Board.
        // Iterate through the E-Board members, render their HTML, and append it the the E-Board container.
        
        const eBoardEl = document.createElement("div");
        eBoardEl.classList.add("clubEBoard");
        contentEl.appendChild(eBoardEl);
        
        // If there's only one member, add the .singleEBMember attribute
        if(this.clubEBoardMembers.length == 1) {
            eBoardEl.classList.add("singleEBMember");
        }
        
        for(const member of this.clubEBoardMembers) {
            const eBoardMemberEl = member.renderHTML();
            eBoardEl.appendChild(eBoardMemberEl);
        }
        
        // Finally, return the finished product (the club card HTML element)
        return cardEl; // :D
    }
    
    // Display the club in a parent element by appending it.
    displayIn(parentElement) {
        const cardEl = this.renderHTML();
        parentElement.appendChild(cardEl);
    }
}

// Function to find the club cards grid
// The ID is hard-coded in this function

export function getClubCardsGrid() {
    return document.getElementById("clubCardsGrid");
}

// Demo
// The try-catch block makes it easier to debug on iPad.
/*try {
    const cardsGrid = getClubCardsGrid();

    const continueWith = confirm("Welcome to the demo of the SHS CS room cards. This will include JS utilities as well as the HTML/CSS code. Do you want to try it out?\n\nYes if you want to add a new room to the list, no if you just want to see the design.\n\nRoom Cards JavaScript Utilities is Free Software. © 2025 Tyler Yeh, licensed under AGPLv3.");

    if(continueWith) {
        const clubName = prompt("Note: If at any point you enter an invalid input, there will be an error.\n\nWhat is the name of the room?");
        const clubImageURL = prompt("Paste the image URL of the room. Leave blank if you don't want anything.");
        const clubDescription = prompt("Enter the description of the room:");
        const numEBoardMembers = parseInt(prompt("Enter the number of E-Board members for this room (1 or greater):"));
        const eBoardMembers = [];
        
        for(let i = 0; i < numEBoardMembers; i++) {
            const memberName = prompt(`Enter the name for E-Board member #${i + 1}`);
            const memberImageURL = prompt(`Enter the image URL for E-Board member #${i + 1}. Leave blank if you don't want anything.`);
            const memberRole = prompt(`Enter the role for E-Board member #${i + 1}`);
            const memberContactType = prompt(`Enter the contact type for E-Board member #${i + 1}. IMPORTANT: Must be exactly "email" or "text" in all lowercase!`);
            const memberContactContent = prompt(`Enter the contact string (email or text) for E-Board member #${i + 1}`);
            
            const member = new ClubCardEBoardMember(memberName, memberImageURL, memberRole, {
                type: memberContactType,
                content: memberContactContent
            });
            
            eBoardMembers.push(member);
        }
        
        const club = new ClubCard({
            clubName: clubName,
            clubImageURL: clubImageURL,
            clubDescription: clubDescription,
            clubEBoardMembers: eBoardMembers
        });
        
        club.displayIn(cardsGrid);
    }

} catch(err) { // iPad-friendly debugging (there is no inspector on iPad)
    alert(err + "\n\n" + err.stack);
}
*/