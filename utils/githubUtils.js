
export const calculateLanguageStats = (repos) => {

    const languageStats = {};

    repos.forEach(repo => {

        if (!repo.language) return;

        languageStats[repo.language] =
            (languageStats[repo.language] || 0) + 1;
    });

    return languageStats;
};


export const calculateAccountAge = (createdAt) => {

    const createdDate = new Date(createdAt);

    const currentDate = new Date();

    const age = currentDate.getFullYear() - createdDate.getFullYear();

    const monthDifference =
        currentDate.getMonth() -
        createdDate.getMonth();

    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            currentDate.getDate() < createdDate.getDate()
        )
    ) {
        age--;
    }

    return age;
}

// for top language
export const getTopLanguage = (languageStats) => {

    let topLanguage = null;
    let maxCount = 0;

    for (const language in languageStats) {

        if (languageStats[language] > maxCount) {

            maxCount = languageStats[language];
            topLanguage = language;
        }
    }

    return topLanguage;
};

// for total stars
export const calculateTotalStars = (repos) => {

    return repos.reduce(
        (total, repo) => total + repo.stargazers_count,
        0
    );
};

// Most stars repository
export const getMostStarredRepo = (repos) => {

    if (repos.length === 0) {
        return null;
    }

    const mostStarredRepo = repos.reduce(
        (maxRepo, currentRepo) =>
            currentRepo.stargazers_count > maxRepo.stargazers_count
                ? currentRepo
                : maxRepo
    );

    return mostStarredRepo.name;
};

