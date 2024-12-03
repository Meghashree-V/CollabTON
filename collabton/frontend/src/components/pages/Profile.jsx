import React from "react";

const Profile = () => {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Your Profile</h1>
            <p>
                View your blockchain address, tasks completed, and earned rewards.
            </p>
            <div>
                <strong>Address:</strong> <span>0x123...456</span>
            </div>
            <div>
                <strong>Tasks Completed:</strong> <span>5</span>
            </div>
            <div>
                <strong>Rewards:</strong> <span>10 NFT</span>
            </div>
        </div>
    );
};

export default Profile;
