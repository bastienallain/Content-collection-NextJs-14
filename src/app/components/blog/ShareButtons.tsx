import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

export default function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const shareUrl = `https://votre-domaine.com${url}`;

  return (
    <div className="flex gap-4 mb-8">
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-600"
      >
        <FaTwitter size={24} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800"
      >
        <FaFacebook size={24} />
      </a>
      <a
        href={`https://www.instagram.com/`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-600 hover:text-pink-800"
      >
        <FaInstagram size={24} />
      </a>
    </div>
  );
}
