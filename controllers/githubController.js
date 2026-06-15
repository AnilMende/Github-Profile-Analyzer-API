import { fetchGithubProfile, fetchGithubRepos } from "../services.js/githubService.js";
import pool from "../config/db.js";
import { calculateAccountAge, calculateLanguageStats, calculateTotalStars, getMostStarredRepo, getTopLanguage } from "../utils/githubUtils.js";

export const analyzeProfile = async (req, res) => {

    try {

        const { username } = req.params;

        const profile = await fetchGithubProfile(username);

        const repos = await fetchGithubRepos(username);

        const languageStats = calculateLanguageStats(repos);

        const accountAgeYears = calculateAccountAge(profile.created_at);

        const topLanguage = getTopLanguage(languageStats);

        const totalStars = calculateTotalStars(repos);

        const mostStarredRepo = getMostStarredRepo(repos);


        const profileData = {
            username: profile.login,
            name: profile.name,
            bio: profile.bio,
            public_repos: profile.public_repos,
            followers: profile.followers,
            following: profile.following,
            profile_url: profile.html_url,
            avatar_url: profile.avatar_url,
            account_created_at: profile.created_at,
            account_age_years: accountAgeYears,
            language_stats: JSON.stringify(languageStats),
            top_language: topLanguage,
            total_stars: totalStars,
            most_starred_repo: mostStarredRepo
        };

        const [existingProfile] = await pool.query(
            "SELECT id FROM github_profiles WHERE username = ?",
            [profile.login]
        );

        // if the user exists just update the data:
        if (existingProfile.length > 0) {

            await pool.query(
                `
        UPDATE github_profiles
        SET
            name = ?,
            bio = ?,
            public_repos = ?,
            followers = ?,
            following = ?,
            profile_url = ?,
            avatar_url = ?,
            account_created_at = ?,
            account_age_years = ?,
            language_stats = ?,
            top_language = ?,
            total_stars = ?,
            most_starred_repo = ?
        WHERE username = ?
        `,
                [
                    profileData.name,
                    profileData.bio,
                    profileData.public_repos,
                    profileData.followers,
                    profileData.following,
                    profileData.profile_url,
                    profileData.avatar_url,
                    profileData.created_at,
                    profileData.account_age_years,
                    profileData.language_stats,
                    profileData.top_language,
                    profileData.total_stars,
                    profileData.most_starred_repo,
                    profileData.username
                ]
            );

            return res.status(200).json({
                success: true,
                message: "Profile updated successfully",
                data: profileData
            });
        }

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
                account_created_at,
                account_age_years,
                language_stats,
                top_language,
                total_stars,
                most_starred_repo
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
            profileData.created_at,
            profileData.account_age_years,
            profileData.language_stats,
            profileData.top_language,
            profileData.total_stars,
            profileData.most_starred_repo
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


        const profile = profiles[0];

        profile.language_stats = JSON.parse(
            profile.language_stats || "{}"
        );

        return res.status(200).json({

            success: true,
            data: profile
        });

    } catch (error) {

        return res.status(200).json({
            success: false,
            message: error.message
        });

    }
}