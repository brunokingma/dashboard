import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/service/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['logar']);
    authServiceMock.logar.and.returnValue(of(true));

    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login form', () => {
    expect(component.loginForm.get('username')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
  });

  it('should navigate to home on successful login', () => {
    const username = 'testuser';
    const password = 'testpassword';

    component.loginForm.setValue({
      username: username,
      password: password,
    });

    component.login();

    expect(authService.logar).toHaveBeenCalledWith(username, password);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeFalse();
  });

  it('should set error flag on failed login', () => {
    const username = 'testuser';
    const password = 'testpassword';

    component.loginForm.setValue({
      username: username,
      password: password,
    });

    // authService.logar.and.returnValue(of(false));

    component.login();

    expect(authService.logar).toHaveBeenCalledWith(username, password);
    expect(component.error).toBeTrue();
    expect(component.loading).toBeFalse();
  });

  it('should handle error during login', () => {
    const username = 'testuser';
    const password = 'testpassword';

    component.loginForm.setValue({
      username: username,
      password: password,
    });

    const error = new Error('Login failed');
    //  authService.logar.and.returnValue(throwError(error));

    component.login();

    expect(authService.logar).toHaveBeenCalledWith(username, password);
    expect(component.error).toBeTrue();
    expect(component.loading).toBeFalse();
  });
});
