import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { NumberCard } from './components'

function Dashboard({ instances, hosts, credentials, machineimages, loading }) {
  const instanceNum = instances.data.length
  const hostNum = hosts.data.length
  const credentialNum = credentials.data.length
  const imageNum = machineimages.data.length
  const { instances: instanceLoading, hosts: hostLoading, credentials: credentialLoading, machineimages: machineimageLoading } = loading.models

  const numbers = [{
    icon: 'laptop',
    color: '#d897eb',
    title: 'Nodes',
    number: hostNum,
    linkTo: '/hosts',
    loading: hostLoading,
  }, {
    icon: 'database',
    color: '#64ea91',
    title: 'Instances',
    number: instanceNum,
    linkTo: '/instances',
    loading: instanceLoading,
  }, {
    icon: 'key',
    color: '#d897eb',
    title: 'Keys',
    number: credentialNum,
    linkTo: '/credentials',
    loading: credentialLoading,
  }, {
    icon: 'appstore',
    color: '#d897eb',
    title: 'Images',
    number: imageNum,
    linkTo: '/machineimages',
    loading: machineimageLoading,
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
  machineimages: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ instances, hosts, credentials, machineimages, loading }) => ({ instances, hosts, credentials, machineimages, loading }))(Dashboard)
