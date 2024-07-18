# Fraud Detection Model Access via API
![Landing Page](./landing.png)


>This app is showcasing the Autogon AI power and this can be integrated into any application that needs to integrate a deployed model. 

This app was built using react [vite](https://vitejs.dev/guide/), and vanilla css.

![Generate Dataset](./generate.png)

To run this app locally, you need to have an [Autogon](https://autogon.ai/) account, so as to be able to get your API key. If you don't have an existing account, [signup](https://console.autogon.ai/), and log in to your dashboard, click your profile image, then click on settings, you'd find the tab for API, generate your API key and come back to your code for usage.

At the root level of your app (that is, the same location where your `vite.config.js` is located), create a `.env` file and put your API key there for safety.

>the `sample.env` file is there to guide you on what is needed
>base url is `https://api.autogon.ai/api/v1`

### Endpoints

*Generate Dataset API*
```plaintext
https://api.autogon.ai/api/v1/models/generate/
```
*Prediction Model API*
```plaintext
https://api.autogon.ai/api/v1/models/production/
```
---

Once you clone this repo, change your directory into the folder, open your terminal, either through your coding environment or your default system based (cmd, terminal). Run `npm install`, and `npm run dev` in the terminal respectively and your app should be running.

:bulb: Generate a Dataset, copy the csv output, go back and paste the link to the transaction url input field.
