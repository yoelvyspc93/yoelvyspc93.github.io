export type ContactFormValues = {
	email: string
	message: string
}

export type ContactFormMessages = {
	emailRequired: string
	emailInvalid: string
	messageRequired: string
}

export type ContactFormValidationResult = {
	values: ContactFormValues
	fieldErrors: ContactFormValues
	firstInvalidField: keyof ContactFormValues | null
	isValid: boolean
}

type SubmitContactFormOptions = {
	form: HTMLFormElement
	accessKey: string
	subject: string
	values: ContactFormValues
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateEmail = (email: string) => EMAIL_REGEX.test(email)

export const validateContactForm = (
	values: ContactFormValues,
	messages: ContactFormMessages,
): ContactFormValidationResult => {
	const normalizedValues = {
		email: values.email.trim(),
		message: values.message.trim(),
	}

	const fieldErrors = {
		email: !normalizedValues.email
			? messages.emailRequired
			: !validateEmail(normalizedValues.email)
				? messages.emailInvalid
				: '',
		message: !normalizedValues.message ? messages.messageRequired : '',
	}

	const firstInvalidField = (Object.entries(fieldErrors).find(
		([, message]) => Boolean(message),
	)?.[0] ?? null) as keyof ContactFormValues | null

	return {
		values: normalizedValues,
		fieldErrors,
		firstInvalidField,
		isValid: firstInvalidField === null,
	}
}

export const submitContactForm = async ({
	form,
	accessKey,
	subject,
	values,
}: SubmitContactFormOptions) => {
	const formData = new FormData(form)
	formData.set('access_key', accessKey)
	formData.set('subject', subject)
	formData.set('email', values.email)
	formData.set('message', values.message)

	const response = await fetch(WEB3FORMS_ENDPOINT, {
		method: 'POST',
		body: formData,
		headers: {
			Accept: 'application/json',
		},
	})

	const result = await response.json().catch(() => null)

	if (!response.ok || result?.success === false) {
		throw new Error(result?.message || 'Web3Forms submission failed')
	}

	return result
}
