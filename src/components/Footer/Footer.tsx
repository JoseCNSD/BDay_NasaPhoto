import './Footer.css'

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

export interface IFooterProps {
}

export function Footer (props: IFooterProps) {
  return (
    <footer className='my-footer'>
        <p className='my-p'>Desenvolvido por<a className='my-footer-anchor' target='_blank' href="https://github.com/JoseCNSD">José Carlos Neto</a>.</p>
        <div className="container-social-media">
            <a target='_blank'  href="https://github.com/JoseCNSD"><GitHubIcon/></a>
            <a target='_blank' href="https://www.linkedin.com/in/jos%C3%A9-carlos-neto-b15295252/"><LinkedInIcon/></a>
            <a target='_blank' href="https://www.instagram.com/jozeofc/"><InstagramIcon/></a>
        </div>

    </footer>
  );
}
