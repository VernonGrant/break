'use babel';

export default {

    // Package Configuration
    config: {

        enabledMicroBreaks: {
            title: 'Enable Micro Breaks',
            description: 'With this enabled you can have a number of short breaks before having the longer macro break',
            type: 'boolean',
            default: false
        },

        enableNotifications:{
            title: 'Enable Notifications',
            description: 'Get a notification 20s before each break. Helps you get ready',
            type: 'boolean',
            default: true
        },

        macroBreak: {
            title: 'Macro Break Configuration',
            description: 'Configure all the settings related to macro breaks',
            type: 'object',
            properties: {
                duration: {
                    title: 'Duration',
                    description: 'How long should the break be in minites.',
                    type: 'integer',
                    default: 5,
                    minimum: 1,
                    maximum: 1439
                },
                interval: {
                    title: 'Interval',
                    description: 'How much time before the break starts in minites. (if no micro breaks)',
                    type: 'integer',
                    default: 25,
                    minimum: 1
                }
            }
        },

        microBreak: {
            title: 'Micro Break Configuration',
            description: 'Configure all the settings related to micro breaks',
            type: 'object',
            properties: {
                duration: {
                    title: 'Duration',
                    description: 'How long should each micro break be in minites.',
                    type: 'integer',
                    default: 3,
                    minimum: 1,
                    maximum: 1439
                },
                interval: {
                    title: 'Interval',
                    description: 'How much time between each micro break in minites.',
                    type: 'integer',
                    default: 30,
                    minimum: 1,
                    maximum: 1439
                },
                amount: {
                    title: 'Amount',
                    description: 'How many micro breaks before the macro break starts',
                    type: 'integer',
                    default: 5,
                    minimum: 1
                }
            }
        }
    }

};
