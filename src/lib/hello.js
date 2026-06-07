export function getHelloMessage(params) {
	// тут любая логика/запрос к БД/внешнему API
	return { message: 'Hello, from shared module!' };
}

export function createHelloGreeting (name) {
	return { message: `Hello ${name}, from shared module!` };
}
