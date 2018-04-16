import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { NumberCard } from './components'

function Dashboard({ instances, hosts, credentials, loading }) {
  const instanceNum = instances.data.length
  const hostNum = hosts.data.length
  const credentialNum = credentials.data.length
  const { instances: instanceLoading, hosts: hostLoading, credentials: credentialLoading } = loading.models

  const numbers = [{
    icon: 'laptop',
    color: '#64ea91',
    title: 'Instances',
    number: instanceNum,
    linkTo: '/instances',
    loading: instanceLoading,
  }, {
    icon: 'database',
    color: '#d897eb',
    title: 'Hosts',
    number: hostNum,
    linkTo: '/hosts',
    loading: hostLoading,
  }, {
    icon: 'key',
    color: '#d897eb',
    title: 'Credentials',
    number: credentialNum,
    linkTo: '/credentials',
    loading: credentialLoading,
  },
  ]

  const numberCards = numbers.map((item, key) => <Col key={key} lg={12} md={12}>
    <NumberCard {...item} />
  </Col>)

  return (
    <div>
      <Row gutter={24}>
        {numberCards}
      </Row>
    </div>
  )
}

Dashboard.propTypes = {
  instances: PropTypes.object,
  hosts: PropTypes.object,
  credentials: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ instances, hosts, credentials, loading }) => ({ instances, hosts, credentials, loading }))(Dashboard)
