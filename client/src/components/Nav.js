import Auth from '../utils/auth';
import {
  Box,
  Flex,
  Text,
  Image,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
} from '@chakra-ui/icons';

import Logo from '../assets/images/Itsy-Bitsy4.png';

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Box pb={{ base: 0, md: 65 }} id='top'>
      <Flex
        as="header" 
        position="fixed" 
        w="100%" 
        zIndex={1} 
        bg={'gray.900'}
        color={'white'}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            _hover={{
              bg: '#0081a7ff'
            }}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={'white'}>
            <Link href='/'>
              <Image src={Logo} h={{ base: 'none', md: '50px' }} />
            </Link>
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          {Auth.loggedIn() ? (
          <>          
          <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'#f07167ff'}
            onClick={logout}
            _hover={{
              cursor: 'pointer',
              bg: '#fed9b7ff',
              color: '#171923',
            }}>
            Logout
          </Button>
          </>) : (
          <>
          <Button
            as={'a'}
            color={'white'}
            fontSize={'sm'}
            fontWeight={500}
            variant={'link'}
            href={'/login'}
            _hover={{
              color: '#f07167ff',
            }}>
            Login
          </Button> 
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'#0081a7ff'}
            href={'/enquire'}
            _hover={{
              bg: '#00afb9ff',
              color: 'white',
            }}>
            Make an Enquiry
          </Button>
          </>)}

        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = 'white';
  const linkHoverColor = '#f07167ff';
  const linkHoverBgColor = 'gray.700';
  const popoverContentBgColor = '#0081a7ff';

  return (
    <Stack mt={3} direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                rounded={'lg'}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                  bg: linkHoverBgColor,
                  fontWeight: 800,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        {/* <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex> */}
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      mt={12}
      bg={'gray.800'}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

let NAV_ITEMS: Array<NavItem> = [];

if (!Auth.loggedIn())
{
  NAV_ITEMS.push({label: 'Vision',href: '/about'});
  NAV_ITEMS.push({label: 'Learning',href: '#'});
  NAV_ITEMS.push({label: 'About Us',href: '/about'});
}
else
{
  NAV_ITEMS.push({label: 'Check Enquiries',href: '/dashboard'});
  NAV_ITEMS.push({label: 'Branches',href: '/dashboard/branches'});
  if (Auth.getUserType()==='SUPER_ADMIN'){
    NAV_ITEMS.push({label: 'Users',href: '/dashboard'});
  }
  NAV_ITEMS.push({label: 'Change Details',href: '/dashboard'});
}

