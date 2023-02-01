import { Component } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css'],
})
export class TrainerPage {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  get user(): User | undefined {
    return this.userService.user;
  }

  navigateToCatalogue(): void {
    this.router.navigateByUrl('/catalogue');
  }
}
