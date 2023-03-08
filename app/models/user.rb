class User < ApplicationRecord
  has_secure_password
  validates :session_token, presence: true
  validates :email, :password_digest, :session_token, uniqueness: true
  validates :firstname, :lastname, length: { in: 1..30 },
    format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email" }
  validates :email, length: { in: 3...255 }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { in: 6...255 }, allow_nil: true
  before_validation :ensure_session_token
  has_many :reviews,
    class_name: :Review,
    foreign_key: :author_id,
    dependent: :destroy

  def self.find_by_credentials(email, password)
    @user = User.find_by(email: email)
    if @user && @user.is_password?(password)
        @user
    else
        nil
    end
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  def generate_unique_session_token
    loop do
      session_token = SecureRandom::urlsafe_base64(16)
      return session_token unless User.exists?(session_token: session_token)
    end
  end
end
