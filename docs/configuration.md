# Tower Configuration


## env.js

This is main application's configuration file, located in `public/env.js`.

- `applogicUrl` - applogic url, including api version path prefix, f.e. for opendax setup:
  ```js
  applogicUrl: 'www.app.domain.com/api/v2/applogic'
  ```
- `authUrl` _string_ - barong url, including api version path
- `peatioUrl` _string_ - peatio url, including api version path
- `finexUrl` _string_ - finex url, including api version path
- `msAlertDisplayTime` _string_ - popup alerts display time in miliseconds
- `tablePageLimit` _number_ - maximum number of rows per table
- `minutesUntilAutoLogout` _string_ - autologout time in minutes
- `finex` _boolean_ - flag if finex enabled
- `captcha` _object_ - reCAPTCHA settings
  - `captchaType` _string_ - `'recaptcha'`, `'geetest'` or `'none'`
  - `siteKey` _string_ - recaptha seret siteKey
- `labelSwitcher` _object{}_ - custom barong KYC user label switcher setup
  - `name` _string_ - KYC step name
  - `label` _array[{}]_ - array of key-value pairs (`{ label_name: 'label_value' }`), f.e.:
  ```js
  labelSwitcher: [
    { name: 'email', label: [{ email: 'verified' }] },
    { name: 'phone', label: [{ phone: 'verified' }] },
    {
      name: 'document',
      label: [
        { document: 'verified'},
        { profile: 'verified' }
      ]
    }
  ]
  ```
- `plugins` _array[string]_ - list of additional optional plugins ('IEO')


## Environment variables

- `BUILD_EXPIRE` _(optional)_ - if set, creates a _'Lite'_ build, which expires at given Unix timestamp **miliseconds**, which means you need to append 000 to your timestamp, f.e.:
```sh
export BUILD_EXPIRE=$(date -d "+1 month" +%s000)
```

- `BUILD_DOMAIN` _(optional)_ - if set, locks build for specified domain.
