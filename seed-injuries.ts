// src/scripts/seed-injuries.ts
/* eslint-disable @typescript-eslint/no-var-requires */
// IMPORTANT: Load environment variables before any other imports
import { config } from 'dotenv';
config({ path: '.env.local' });

// IMPORTANT: We must import the admin SDK *after* dotenv has run.
import { dbAdmin } from '../lib/firebaseadmin';
import { Timestamp } from 'firebase-admin/firestore';

if (!dbAdmin) {
  console.error('Firebase Admin SDK is not initialized. Cannot run seed script. Please check your FIREBASE_SERVICE_ACCOUNT_KEY.');
  process.exit(1);
}

interface PlayerInjurySeed {
  playerId: number;
  playerName: string;
  position: string;
  status: string;
  comment: string;
  estimatedReturnDate: string; // ISO 8601 string
  lastUpdated: string; // ISO 8601 string
}

const allTeamsInjuries: Record<string, { teamName: string; abbreviation: string; injuries: PlayerInjurySeed[] }> = {
    'ARI': {
        teamName: 'Arizona Diamondbacks',
        abbreviation: 'ARI',
        injuries: [
            { playerId: 553993, playerName: "Eugenio Suarez", position: "3B", status: "Day-To-Day", comment: "X-rays on Suarez's right index finger came back negative after he was hit by a pitch during Monday's 5-1 loss to the Tigers, Evan Petzold of the Detroit Free Press reports.", estimatedReturnDate: "2024-07-29T00:00:00Z", lastUpdated: "2024-07-28T00:00:00Z" },
            { playerId: 605381, playerName: "Shelby Miller", position: "RP", status: "15-Day-IL", comment: "Miller (forearm) threw a 16-pitch bullpen session Friday, MLB.com reports.", estimatedReturnDate: "2024-08-01T00:00:00Z", lastUpdated: "2024-07-27T00:00:00Z" },
            { playerId: 663974, playerName: "Jalen Beeks", position: "RP", status: "15-Day-IL", comment: "Beeks (back) threw a 23-pitch live batting practice session Friday, MLB.com reports.", estimatedReturnDate: "2024-07-30T00:00:00Z", lastUpdated: "2024-07-27T00:00:00Z" },
            { playerId: 669288, playerName: "Pavin Smith", position: "1B", status: "10-Day-IL", comment: "Smith (oblique) could become the primary starter at first base after the Diamondbacks traded Josh Naylor to the Mariners on Thursday, Manny Randhawa of MLB.com reports.", estimatedReturnDate: "2024-08-01T00:00:00Z", lastUpdated: "2024-07-25T00:00:00Z" },
            { playerId: 676051, playerName: "Kyle Amendt", position: "RP", status: "Day-To-Day", comment: "Amendt was invited to major-league spring training by the Diamondbacks, Alex Weiner of Arizona Sports reports.", estimatedReturnDate: "2024-08-02T00:00:00Z", lastUpdated: "2024-07-21T00:00:00Z" },
            { playerId: 680423, playerName: "Gabriel Moreno", position: "C", status: "60-Day-IL", comment: "Arizona manager Torey Lovullo said Monday that Moreno's recent CT scan showed his fractured right index finger hasn't completely healed...", estimatedReturnDate: "2024-08-16T00:00:00Z", lastUpdated: "2024-07-21T00:00:00Z" },
            { playerId: 622095, playerName: "Ryan Thompson", position: "RP", status: "15-Day-IL", comment: "Thompson (shoulder) has begun a throwing program, Alex Weiner of Arizona Sports reports.", estimatedReturnDate: "2024-08-04T00:00:00Z", lastUpdated: "2024-07-18T00:00:00Z" },
        ]
    },
    'OAK': {
        teamName: 'Oakland Athletics',
        abbreviation: 'OAK',
        injuries: [
            { playerId: 805779, playerName: "Jacob Wilson", position: "SS", status: "Day-To-Day", comment: "Wilson (hand) is not in the Athletics' starting lineup against the Mariners on Monday.", estimatedReturnDate: "2024-07-29T00:00:00Z", lastUpdated: "2024-07-28T00:00:00Z" },
            { playerId: 681883, playerName: "Grant Holman", position: "RP", status: "60-Day-IL", comment: "Holman (shoulder) has been shut down from throwing due to a mild strain in his right middle finger, Martin Gallegos of MLB.com reports.", estimatedReturnDate: "2024-08-22T00:00:00Z", lastUpdated: "2024-07-25T00:00:00Z" },
            { playerId: 669256, playerName: "Max Muncy", position: "3B", status: "10-Day-IL", comment: "Muncy is dealing with a hairline fracture at the base of the fourth metacarpal on his right hand, Martin Gallegos of MLB.com reported Friday.", estimatedReturnDate: "2024-08-01T00:00:00Z", lastUpdated: "2024-07-25T00:00:00Z" },
            { playerId: 592494, playerName: "Jose Leclerc", position: "RP", status: "60-Day-IL", comment: "Leclerc (lat) will undergo shoulder surgery and will miss the remainder of the 2025 season, Martin Gallegos of MLB.com reports.", estimatedReturnDate: "2025-02-01T00:00:00Z", lastUpdated: "2024-07-25T00:00:00Z" },
        ]
    },
    'ATL': {
        teamName: 'Atlanta Braves',
        abbreviation: 'ATL',
        injuries: [
            { playerId: 656550, playerName: "Grant Holmes", position: "SP", status: "60-Day-IL", comment: "Atlanta placed Holmes on the 15-day injured list Sunday due to right elbow inflammation.", estimatedReturnDate: "2024-09-26T00:00:00Z", lastUpdated: "2024-07-27T00:00:00Z" },
            { playerId: 592723, playerName: "Chris Sale", position: "SP", status: "60-Day-IL", comment: "Sale (ribs) played catch Tuesday, Mark Bowman of MLB.com reports.", estimatedReturnDate: "2024-08-19T00:00:00Z", lastUpdated: "2024-07-16T00:00:00Z" },
        ]
    }
};


async function seedInjuries() {
    console.log('Starting to seed injury data...');
    const batch = dbAdmin!.batch();

    for (const [teamId, teamData] of Object.entries(allTeamsInjuries)) {
        console.log(`Processing team: ${teamData.teamName} (${teamId})`);
        
        // Set team document
        const teamRef = dbAdmin!.collection('teams').doc(teamId);
        batch.set(teamRef, {
            teamName: teamData.teamName,
            abbreviation: teamData.abbreviation,
            lastUpdated: Timestamp.now(),
        }, { merge: true });

        // Set injuries in subcollection
        for (const injury of teamData.injuries) {
            const { playerId, ...injuryData } = injury;
            const injuryRef = teamRef.collection('injuries').doc(String(playerId));
            
            const dataToSet = {
                ...injuryData,
                estimatedReturnDate: Timestamp.fromDate(new Date(injury.estimatedReturnDate)),
                lastUpdated: Timestamp.fromDate(new Date(injury.lastUpdated)),
            };

            batch.set(injuryRef, dataToSet);
        }
    }

    try {
        await batch.commit();
        console.log('✅ Successfully seeded all injury data to Firestore.');
    } catch (error) {
        console.error('❌ Error committing batch for injury data:', error);
        process.exit(1); // Exit with error
    }
}

seedInjuries().then(() => {
    console.log('Seeding script finished successfully.');
    process.exit(0); // Exit with success
}).catch((error) => {
    console.error('Seeding script failed:', error);
    process.exit(1); // Exit with error
});
