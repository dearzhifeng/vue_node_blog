import Vue from 'vue'
import {
    Button,
    Container,
    Main,
    Header,
    Aside,
    Footer,
    Input,
    Message,
    MessageBox,
    FormItem,
    Form,
    Backtop,
    Menu,
    Submenu,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Tooltip,
    Dialog,
    Pagination,
    Alert,
    Switch,
    Select,
    Option,
    Upload,
    DatePicker,
    Tag

} from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Footer)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Backtop)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Alert)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)
Vue.use(DatePicker)
Vue.use(Tag)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
