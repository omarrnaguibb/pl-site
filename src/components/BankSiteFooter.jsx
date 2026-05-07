import {
  FaFacebookF,
  FaFacebookMessenger,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

function SocialIconLink({ href, title, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className="inline-flex text-slate-200 transition hover:text-white"
    >
      {children}
    </a>
  );
}

export function BankSiteFooter({ className = "" }) {
  const year = new Date().getFullYear();

  const footerLinks = [
    { href: "https://www.bop.ps/career", label: "Career" },
    {
      href: "https://www.bop.ps/en/about/art-collections",
      label: "Art Collections",
    },
    {
      href: "https://bopwebsitestorage.blob.core.windows.net/assets/uploads/W5BksbtIEkKKrTNxvns8IrILPEySbnEGzazFscM7.pdf",
      label: "Fees and Commissions",
    },
    { href: "https://www.bop.ps/en/about/news", label: "News" },
    {
      href: "https://www.bop.ps/en/personal/tenders",
      label: "Tenders",
    },
    {
      href: "https://www.bop.ps/en/personal/iban-calculator",
      label: "IBAN Generator",
      dir: "ltr",
    },
    {
      href: "https://www.bop.ps/en/personal/exchange",
      label: "Currency Exchange",
    },
  ];

  return (
    <footer
      className={`footer-copyright bg-[#3a3a3c] pb-3 pt-0 text-slate-200 ${className}`}
      lang="en"
    >
      <div className="container w-full ">
        <div className="flex flex-col gap-4 pt-3 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
          <div className="flex justify-center lg:justify-start">
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 p-0">
              <li>
                <SocialIconLink href="#" title="Facebook">
                  <FaFacebookF className="size-[18px]" aria-hidden />
                </SocialIconLink>
              </li>
              <li>
                <SocialIconLink href="#" title="Twitter">
                  <FaTwitter className="size-[18px]" aria-hidden />
                </SocialIconLink>
              </li>
              <li>
                <SocialIconLink href="#" title="Messenger">
                  <FaFacebookMessenger className="size-[18px]" aria-hidden />
                </SocialIconLink>
              </li>
              <li>
                <SocialIconLink
                  href="#"
                  title="Whatsapp"
                >
                  <FaWhatsapp className="size-[18px]" aria-hidden />
                </SocialIconLink>
              </li>
              <li>
                <SocialIconLink href="#" title="Instagram">
                  <FaInstagram className="size-[18px]" aria-hidden />
                </SocialIconLink>
              </li>
              <li>
                <SocialIconLink href="#" title="Linkedin">
                  <FaLinkedin className="size-[18px]" aria-hidden />
                </SocialIconLink>
              </li>
              <li>
                <SocialIconLink href="#" title="Youtube">
                  <FaYoutube className="size-[18px]" aria-hidden />
                </SocialIconLink>
              </li>
            </ul>
          </div>
          <div className="text-center lg:text-end">
            <ul className="m-0 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 p-0 lg:justify-end">
              {footerLinks.map(({ href, label, dir: linkDir }) => (
                <li key={href + label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir={linkDir}
                    className="link-color-light text-sm text-slate-300 underline-offset-2 hover:text-white hover:underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-3 border-t border-slate-600 pt-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-center lg:text-start">
            <p className="mb-0 pb-0 text-sm text-slate-300">
              Copyrights © {year}. All Rights Reserved by Bank of Palestine
            </p>
          </div>
          <div className="text-center lg:text-end">
            <ul className="m-0 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 p-0">
              <li>
                <a
                  rel="noopener noreferrer"
                  className="text-sm  underline-offset-2 hover:text-sky-300 hover:underline"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  className="text-sm  underline-offset-2 hover:text-sky-300 hover:underline"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
