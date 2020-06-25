const errors = {
    'resource.labels.private': 'Can\'t update label',
    'resource.user.no_activity': 'No activity recorded or wrong topic',
    'resource.profile.not_exist': 'User has no profile',
    'resource.profile.exist': 'Profile already exists',
    'resource.api_key.2fa_disabled': 'Only accounts with enabled 2FA alowed',
    'resource.api_key.missing_otp': 'Theaccount has enabled 2FA but OTP code is missing',
    'resource.api_key.invalid_otp': 'OTP code is invalid',
    'resource.phone.twillio': 'Something wrong with Twilio Client',
    'resource.phone.invalid_num ': 'Phone number is invalid',
    'resource.phone.number_exist': 'Phone number already exists',
    'resource.phone.verification_invalid': 'Phone is not found or verification code is invalid',
    'resource.documents.limit_reached': 'Maximum number of documents already reached',
    'resource.documents.limit_will_be_reached': 'Documents amount will reach limit by this upload',
    'resource.otp.already_enabled':'2FA has been already enabled for this account',
    'resource.otp.invalid': 'OTP code is invalid',
    'resource.password.doesnt_match': 'New passwords don\'t match',
    'resource.password.prev_pass_not_correct': 'Previous password is not correct',
    'resource.password.no_change_provided': 'New password cant be the same, as old one',

    'identity.user.invalid_referral_format': 'Invalid referral uid format',
    'identity.user.referral_doesnt_exist': 'Referral doesn\'t exist',
    'identity.user.active_or_doesnt_exist': 'User doesn\'t exist or has already been activated',
    'identity.password.user_doesnt_exist': 'User doesn\'t exist',
    'identity.user.passwords_doesnt_match': 'Passwords don\'t match',
    'identity.user.utilized_token': 'JWT has already been used',
    'identity.session.invalid_login_params': 'Invalid Email or Password',
    'identity.session.invalid': 'Invalid Session',
    'identity.captcha.required': 'captcha_response is required',
    'identity.captcha.mandatory_fields': 'Mandatory fields must be filled in',
    'identity.session.not_active': 'Your account is not active',
    'identity.session.banned': 'Your account is banned',
    'identity.session.invalid_params': 'Invalid Email or Password',
    'identity.session.missing_otp': 'The account has enabled 2FA but OTP code is missing',
    'identity.session.invalid_otp': 'OTP code is invalid',

    'first_name.invalid': 'First name is invalid',
    'last_name.invalid': 'Last name is invalid',
    'city.invalid': 'City is invalid',
    'postcode.invalid': 'Postcode is invalid',
    'address.invalid': 'Address is invalid',
    'first_name.blank': 'First name is missing or empty',
    'last_name.blank': 'Last name is missing or empty',
    'dob.blank': 'Date of birth is invalid',
    'address.blank': 'Address is missing or empty',
    'city.blank': 'City is missing or empty',
    'country.blank': 'Country is missing or empty',
    'postcode.blank': 'Postcode.blank is missing or empty',
    'country.must have alpha2 or alpha3 format': 'Country must have alpha2 or alpha3 format',

    'totp.error': 'OTP code is invalid',

    'admin.user.update_himself': 'Admin can\'t update himself',
    'admin.user.enable_2fa': 'Manual 2FA enabling not allowed',
    'admin.user.state_no_change': 'Can\'t change state',
    'admin.user.doesnt_exist': 'User with such UID doesnt exist',
    'admin.label.doesnt_exist': 'Label with such key doesnt exist or not assigned to chosen user',
    'admin.access.denied': 'Access Denied: User is not Admin',

    'record.not_found': 'Record is not found',
    'jwt.decode_and_verify': 'Failed to decode and verify JWT',
    'authz.invalid_session': 'Unauthorized',
    'authz.user_not_active': 'User is not active',
    'authz.invalid_signature': 'API Key header \'signature\' is invalid',
    'authz.apikey_not_active': 'API Key state is \'inactive',
    'authz.disabled_2fa': 'API Key owner has disabled 2FA',
    'authz.invalid_api_key_headers': 'Blank or missing API Key headers',
    'authz.permission_denied': 'Path is blacklisted',
    'authz.unexistent_apikey': 'X-Auth-Apikey header is invalid',

    // peatio
    'admin.adjustment.missing_receiving_member_uid': 'Missing receiving member UID',
    'admin.adjustment.redundant_receiving_member_uid': 'Redundant receiving member UID',
    'admin.adjustment.cannot_perform_accept_action': 'Cannot perform accept action',
    'admin.adjustment.cannot_perform_reject_action': 'Cannot perform reject action',

    'admin.blockchain.invalid_server': 'Invalid server',
    'admin.blockchain.non_positive_min_confirmations': '',
    'admin.blockchain.key_too_long': 'Key is too long',
    'admin.blockchain.name_too_long': 'Name is too long',

    'admin.currency.invalid_type': 'Invalid type',
    'admin.currency.invalid_subunits': 'Invalid subunits',
    'admin.currency.blockchain_key_doesnt_exist': 'Blockchain key does not exit',
    'admin.currency.one_of_base_factor_subunits_fields': 'One of base_factor subunits fields',
    'admin.currency.non_json_options': 'Non json options',

    'admin.depodit.cannot_cancel': 'Cannot cancel',
    'admin.depodit.cannot_accept': 'Cannot accept',
    'admin.depodit.cannot_reject': 'Cannot reject',
    'admin.depodit.cannot_skip': 'Cannot skip',
    'admin.depodit.cannot_dispatch': 'Cannot dispatch',

    'admin.market.currency_doesnt_exist': 'Currency does not exist',
    'admin.market.invalid_state': 'Invalid state',
};

export const convertError = (value: string) => {
    if (errors.hasOwnProperty(value)) {
        return (errors as any)[value]; // tslint:disable-line no-any
    }

    return value;
};
