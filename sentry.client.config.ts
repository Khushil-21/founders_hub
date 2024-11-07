// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: "https://4175f000f87c92148b6b5f7009561b27@o4508255327158272.ingest.us.sentry.io/4508255328337920",

	// Add optional integrations for additional features
	integrations: [
		Sentry.replayIntegration(),

		Sentry.feedbackIntegration({
			colorScheme: "system",
			isNameRequired: true,
			isEmailRequired: true,
			id: "feedback-button",
		}),
	],

	// Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
	tracesSampleRate: 1,

	// Define how likely Replay events are sampled.
	// This sets the sample rate to be 10%. You may want this to be 100% while
	// in development and sample at a lower rate in production
	replaysSessionSampleRate: 0.1,

	// Define how likely Replay events are sampled when an error occurs.
	replaysOnErrorSampleRate: 1.0,

	// Setting this option to true will print useful information to the console while you're setting up Sentry.
	debug: false,
});
