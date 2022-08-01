export default function AvatarComponent({ src }) {
    return <img src={src} style={{ borderRadius: "50%" }} data-testid="avatar" />;
}
