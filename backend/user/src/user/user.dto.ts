export class UserProfileDto {
  id: string;
  username: string;
  displayName: string;
  avatar: string | null;
  headerPhoto: string | null;
  followersCount: number;
  followingCount: number;
  createdAt: Date;
}
export class UpdateUserDto {
  id: string;
  displayName?: string;
  avatar?: string;
  headerPhoto?: string;
}

export class FollowUserDto {
  userId: string;
  targetUserId: string;
}

export class CreateUserDto {
  username: string;
  displayName: string;
  password: string;
  email: string;
}
