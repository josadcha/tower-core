# Troubleshooting


## Cannot Sign In

1. Your user should have one of the following roles on Barong:
`'admin', 'superadmin', 'accountant', 'compliance', 'support', 'technical'`.

2. Check if `authUrl` set properly in `env.js` file, in **opendax** setup it is located under `config/frontend/tower.js`.

3. Check Barong Permissions cache:
    ```ruby
    Rails.cache.read('permissions')
    ```
    If it is wrong/empty, update it:
    ```ruby
    Rails.cache.delete('permissions')
    ```
    If it is still empty, reseed it.


## Blank screen

1. Check if you built project with correct BUILD_DOMAIN set.

2. Check that all fileds set in `env.js`, in **opendax** setup it is located under `config/frontend/tower.js`.

3. Check if you use compatible backend versions. (`peatio, ranger, barong, applogic, finex`).


## Missing data

1. Check `peatioUrl` and `applogicUrl` in `env.js`.

2. Check if your backend versions are compatible with project version.
