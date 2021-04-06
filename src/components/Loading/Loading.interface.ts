export interface LoadingInterface {
    condition: () => Promise<JSX.Element>
    loader?: JSX.Element
}
