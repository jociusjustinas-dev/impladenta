import { Star } from 'lucide-react'
import { BfIcon } from './BfIcon'

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M23.0935 9.91355H13.3042C12.8719 9.91309 12.5215 10.2634 12.5215 10.6957V13.823C12.5215 14.2552 12.8719 14.6056 13.3041 14.6056H18.8169C18.2132 16.1722 17.0865 17.4842 15.6491 18.3178L17.9997 22.387C21.7704 20.2062 23.9997 16.3799 23.9997 12.0965C23.9997 11.4866 23.9548 11.0506 23.8649 10.5597C23.7965 10.1867 23.4727 9.91355 23.0935 9.91355Z"
        fill="#167EE6"
      />
      <path
        d="M12.0003 19.3042C9.30242 19.3042 6.94723 17.8302 5.68231 15.6489L1.61328 17.9943C3.68398 21.5831 7.56308 23.9998 12.0003 23.9998C14.177 23.9998 16.2309 23.4138 18.0003 22.3924V22.3868L15.6496 18.3176C14.5744 18.9412 13.3302 19.3042 12.0003 19.3042Z"
        fill="#12B347"
      />
      <path
        d="M4.69566 11.9998C4.69566 10.67 5.05856 9.42589 5.68205 8.35071L1.61302 6.00537C0.586031 7.76914 0 9.81748 0 11.9998C0 14.1821 0.586031 16.2304 1.61302 17.9942L5.68205 15.6489C5.05856 14.5737 4.69566 13.3296 4.69566 11.9998Z"
        fill="#FFD500"
      />
      <path
        d="M12.0003 4.69566C13.7595 4.69566 15.3755 5.32078 16.6377 6.36061C16.9491 6.61711 17.4017 6.59859 17.6869 6.31336L19.9027 4.09758C20.2263 3.77395 20.2033 3.24422 19.8575 2.94431C17.7428 1.10967 14.9912 0 12.0003 0C7.56308 0 3.68398 2.41673 1.61328 6.00558L5.68231 8.35092C6.94723 6.16969 9.30242 4.69566 12.0003 4.69566Z"
        fill="#FF4B26"
      />
    </svg>
  )
}

type BfGoogleRatingRowProps = {
  href: string
  score: string
  reviewCount: number
  tone?: 'default' | 'on-dark'
  className?: string
}

export function BfGoogleRatingRow({
  href,
  score,
  reviewCount,
  tone = 'default',
  className = '',
}: BfGoogleRatingRowProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`bf-hero-google-rating ${tone === 'on-dark' ? 'bf-hero-google-rating--light' : ''} ${className}`.trim()}
    >
      <span className="bf-hero-google-rating__icon" aria-hidden>
        <GoogleIcon />
      </span>
      <span className="bf-hero-google-rating__score">{score}</span>
      <span className="bf-hero-google-rating__stars" aria-hidden>
        {Array.from({ length: 5 }).map((_, index) => (
          <BfIcon key={index} icon={Star} size={12} className="bf-hero-google-rating__star" />
        ))}
      </span>
      <span className="bf-hero-google-rating__count">{reviewCount} atsiliepimai</span>
    </a>
  )
}
