'use babel';

export default {

    config: {

        enabledMicroBreaks: {
            title: 'Enable Micro Breaks',
            description: 'Enable the micro break functionality',
            type: 'boolean',
            default: false,
            order: 1
        },

        macroBreak: {
            title: 'Macro Break Configuration',
            description: 'Configure all the settings related to macro breaks',
            type: 'object',
            order: 2,
            properties: {
                enableNotifications: {
                    title: 'Enable Notifications',
                    description: 'Get a notification 30 seconds before each macro break',
                    type: 'boolean',
                    default: true,
                    order: 1
                },
                duration: {
                    title: 'Duration',
                    description: 'Duration in minites of each macro break',
                    type: 'integer',
                    default: 10,
                    minimum: 1,
                    maximum: 1439,
                    order: 2
                },
                interval: {
                    title: 'Interval',
                    description: 'Time in minites between each macro break',
                    type: 'integer',
                    default: 60,
                    minimum: 1,
                    order: 3
                }
            }
        },

        microBreak: {
            title: 'Micro Break Configuration',
            description: 'Configure all the settings related to micro breaks',
            type: 'object',
            order: 3,
            properties: {
                enableNotifications: {
                    title: 'Enable Notifications',
                    description: 'Get a notification 30s before each micro break',
                    type: 'boolean',
                    default: true,
                    order: 1
                },
                duration: {
                    title: 'Duration',
                    description: 'Duration in minites of each micro break',
                    type: 'integer',
                    default: 5,
                    minimum: 1,
                    maximum: 1439,
                    order: 2
                },
                interval: {
                    title: 'Interval',
                    description: 'Time in minites between each mico break',
                    type: 'integer',
                    default: 30,
                    minimum: 1,
                    maximum: 1439,
                    order: 3
                },
                amount: {
                    title: 'Amount',
                    description: 'Amount of micro breaks before the macro break starts',
                    type: 'integer',
                    default: 5,
                    minimum: 1,
                    order: 4
                }
            }
        }
    },

    quotes: [
        "Whatever the mind of man can conceive and believe, it can achieve – Napoleon Hill",
        "A goal is a dream with a deadline. – Napoleon Hill",
        "If you cannot do great things, do small things in a great way. – Napoleon Hill",
        "Don't wait. The time will never be just right. – Napoleon Hill",
        "Patience, persistence and perspiration make an unbeatable combination for success. – Napoleon Hill",
        "The starting point of all achievement is desire. – Napoleon Hill",
        "It is literally true that you can succeed best and quickest by helping others to succeed. – Napoleon Hill",
        "When your desires are strong enough you will appear to possess superhuman powers to achieve. – Napoleon Hill",
        "Most great people have attained their greatest success just one step beyond their greatest failure. – Napoleon Hill",
        "Action is the real measure of intelligence. – Napoleon Hill"
    ]

};
