export class UserProfileDto {
  id: number;
  username: string;
  displayName: string;
  avatar: string | null;
  headerPhoto: string | null;
  followersCount: number;
  followingCount: number;
  createdAt: Date;
}
export class UpdateUserDto {
  id: number;
  displayName?: string;
  avatar?: string;
  headerPhoto?: string;
}

export class FollowUserDto {
  userId: number;
  targetUserId: number;
}

export class CreateUserDto {
  userId: number;
  username: string;
  displayName: string;
  password: string;
  email: string;
}
