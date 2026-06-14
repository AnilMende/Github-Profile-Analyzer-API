import { fetchGithubProfile } from "../services.js/githubService.js";
import pool from "../config/db.js";

export const analyzeProfile = async (req, res) => {

    try {

        const { username } = req.params;

        const profile = await fetchGithubProfile(username);

        const profileData = {
            username: profile.login,
            name: profile.name,
            bio: profile.bio,
            public_repos: profile.public_repos,
            followers: profile.followers,
            following: profile.following,
            profile_url: profile.html_url,
            avatar_url: profile.avatar_url,
            account_created_at: profile.account_created_at
        };

        const query = `
            INSERT INTO github_profiles
            (
                username,
                name,
                bio,
                public_repos,
                followers,
                following,
                profile_url,
                avatar_url,
                account_created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await pool.query(query, [
            profileData.username,
            profileData.name,
            profileData.bio,
            profileData.public_repos,
            profileData.followers,
            profileData.following,
            profileData.profile_url,
            profileData.avatar_url,
            profileData.account_created_at
        ]);


        return res.status(200).json({
            success: true,
            data: profileData
        });

    } catch (error) {

        if (error.response?.status === 404) {

            return res.status(404).json({
                success: false,
                message: "GitHub user not found"
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

// Get profiles
export const getAllProfiles = async (req, res) => {

    try {
        const [profiles] = await pool.query(
            `SELECT * FROM github_profiles
             ORDER BY analyzed_at DESC`
        );

        return res.status(200).json({
            success: true,
            count: profiles.length,
            data: profiles
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getProfileByUsername = async (req, res) => {

    try {

        const { username } = req.params;

        const [profiles] = await pool.query(
            "SELECT * FROM github_profiles WHERE username = ?",
            [username]
        );

        if (profiles.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        };

        return res.status(200).json({

            success : true,
            data : profiles[0]
        });

    } catch (error) {

        return res.status(200).json({
            success : false,
            message : error.message
        });
        
    }
}