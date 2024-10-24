class _AuthService {
	user = $state<string | undefined>();
	setUser() {
		this.user = 'sina';
	}
}

export const AuthService = new _AuthService();
